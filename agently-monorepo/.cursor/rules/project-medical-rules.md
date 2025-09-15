# 의료계 플랫폼 특화 규칙

## 의료계 도메인 규칙

### 의료진 분류 및 검증
```typescript
// 의사 자격 검증
interface DoctorValidation {
  medicalLicenseNumber: {
    format: /^MD\d{6}$/; // MD + 6자리 숫자
    uniqueness: boolean; // 중복 검사
    validity: boolean; // 보건복지부 검증
  };
  specialty: {
    allowedValues: [
      'internal', 'surgery', 'pediatrics', 
      'obstetrics', 'psychiatry', 'dermatology'
    ];
    required: boolean;
  };
  hospitalAffiliation: {
    required: boolean;
    maxLength: 100;
  };
}

// 코디네이터 자격 검증
interface CoordinatorValidation {
  specialty: {
    allowedValues: [
      'internal', 'surgery', 'pediatrics',
      'obstetrics', 'psychiatry', 'dermatology'
    ];
    required: boolean;
  };
  experience: {
    minYears: 1;
    maxYears: 50;
  };
  certification: {
    required: boolean;
    validTypes: ['nurse', 'coordinator', 'medical_admin'];
  };
}
```

### 의료 라이선스 검증
```typescript
class MedicalLicenseValidator {
  private static readonly LICENSE_PATTERN = /^MD\d{6}$/;
  
  static validate(licenseNumber: string): boolean {
    if (!this.LICENSE_PATTERN.test(licenseNumber)) {
      throw new Error('의료 라이선스 번호 형식이 올바르지 않습니다');
    }
    
    // 보건복지부 API 호출로 실제 검증
    return this.verifyWithMinistry(licenseNumber);
  }
  
  private static async verifyWithMinistry(licenseNumber: string): Promise<boolean> {
    // 실제 구현에서는 보건복지부 API 호출
    return true;
  }
}
```

## 개인정보 보호 규칙

### 의료 정보 보안
```typescript
// 개인정보 마스킹
class PersonalInfoMasker {
  static maskEmail(email: string): string {
    const [username, domain] = email.split('@');
    const maskedUsername = username.substring(0, 2) + '*'.repeat(username.length - 2);
    return `${maskedUsername}@${domain}`;
  }
  
  static maskPhoneNumber(phone: string): string {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  }
  
  static maskMedicalLicense(license: string): string {
    return license.replace(/(MD)\d{4}(\d{2})/, '$1****$2');
  }
}

// 데이터 분류
enum DataClassification {
  PUBLIC = 'public',           // 공개 정보
  INTERNAL = 'internal',       // 내부 정보
  CONFIDENTIAL = 'confidential', // 기밀 정보
  RESTRICTED = 'restricted'    // 제한 정보
}

const DATA_CLASSIFICATION = {
  [DataClassification.PUBLIC]: {
    fields: ['name', 'specialty', 'hospitalAffiliation'],
    protection: 'basic'
  },
  [DataClassification.INTERNAL]: {
    fields: ['email', 'phoneNumber', 'experience'],
    protection: 'encrypted'
  },
  [DataClassification.CONFIDENTIAL]: {
    fields: ['medicalLicenseNumber', 'personalId'],
    protection: 'strong_encryption'
  },
  [DataClassification.RESTRICTED]: {
    fields: ['medicalRecords', 'treatmentHistory'],
    protection: 'maximum_encryption'
  }
};
```

## 리뷰 시스템 규칙

### 리뷰 작성 권한
```typescript
interface ReviewEligibilityRules {
  user: {
    authenticated: boolean; // 인증된 사용자
    notTarget: boolean; // 리뷰 대상이 아닌 사용자
    notBlocked: boolean; // 차단되지 않은 사용자
  };
  target: {
    exists: boolean; // 리뷰 대상 존재
    active: boolean; // 활성 상태
    reviewable: boolean; // 리뷰 가능한 상태
  };
  previousReview: {
    notExists: boolean; // 기존 리뷰 없음
    notRecent: boolean; // 최근 리뷰 작성 제한 (24시간)
  };
}

class ReviewEligibilityService {
  async canUserWriteReview(
    userId: string, 
    targetId: string, 
    targetType: 'doctor' | 'coordinator'
  ): Promise<boolean> {
    // 자신에 대한 리뷰 작성 불가
    if (userId === targetId) {
      return false;
    }
    
    // 최근 24시간 내 리뷰 작성 제한
    const recentReview = await this.reviewRepository.findRecentReview(
      userId, 
      targetId, 
      24
    );
    
    if (recentReview) {
      return false;
    }
    
    // 하루 리뷰 작성 한도 (10개)
    const todayReviewCount = await this.reviewRepository.countTodayReviews(userId);
    if (todayReviewCount >= 10) {
      return false;
    }
    
    return true;
  }
}
```

### 리뷰 내용 검증
```typescript
class ReviewContentValidator {
  private static readonly PROFANITY_FILTER = [
    '욕설', '비방', '허위', '의료법 위반'
  ];
  
  static validateContent(content: string): ValidationResult {
    const errors: string[] = [];
    
    // 길이 검증
    if (content.length < 10) {
      errors.push('리뷰 내용은 최소 10자 이상이어야 합니다');
    }
    
    if (content.length > 500) {
      errors.push('리뷰 내용은 최대 500자까지 작성할 수 있습니다');
    }
    
    // 욕설 필터링
    if (this.containsProfanity(content)) {
      errors.push('부적절한 내용이 포함되어 있습니다');
    }
    
    // 의료법 위반 내용 검사
    if (this.containsMedicalViolation(content)) {
      errors.push('의료법 위반 내용이 포함되어 있습니다');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  private static containsProfanity(content: string): boolean {
    return this.PROFANITY_FILTER.some(word => content.includes(word));
  }
  
  private static containsMedicalViolation(content: string): boolean {
    const violations = [
      '진단', '처방', '치료', '수술'
    ];
    return violations.some(word => content.includes(word));
  }
}
```

## 매칭 시스템 규칙

### 코디네이터-의사 매칭
```typescript
interface MatchingRules {
  specialty: {
    match: boolean; // 전문 분야 일치 필수
    required: boolean;
  };
  location: {
    proximity: 50; // 50km 이내
    preferred: boolean;
  };
  availability: {
    timeOverlap: boolean; // 시간 겹침
    scheduleMatch: boolean; // 일정 일치
  };
  experience: {
    minYears: 1; // 최소 1년 경력
    maxYears: 50; // 최대 50년 경력
  };
  rating: {
    minRating: 3.0; // 최소 3.0 평점
    minReviews: 5; // 최소 5개 리뷰
  };
}

class MatchingService {
  async findCompatibleMatches(
    coordinatorId: string,
    criteria: MatchingCriteria
  ): Promise<Doctor[]> {
    const coordinator = await this.coordinatorRepository.findById(coordinatorId);
    if (!coordinator) {
      throw new Error('코디네이터를 찾을 수 없습니다');
    }
    
    // 전문 분야 일치하는 의사들 조회
    const doctors = await this.doctorRepository.findBySpecialty(
      coordinator.specialty
    );
    
    // 매칭 점수 계산
    const scoredDoctors = doctors.map(doctor => ({
      doctor,
      score: this.calculateMatchingScore(coordinator, doctor, criteria)
    }));
    
    // 점수순 정렬 및 필터링
    return scoredDoctors
      .filter(item => item.score >= 0.7) // 70% 이상 매칭
      .sort((a, b) => b.score - a.score)
      .map(item => item.doctor);
  }
  
  private calculateMatchingScore(
    coordinator: Coordinator,
    doctor: Doctor,
    criteria: MatchingCriteria
  ): number {
    let score = 0;
    
    // 전문 분야 일치 (40%)
    if (coordinator.specialty === doctor.specialty) {
      score += 0.4;
    }
    
    // 지역 근접성 (20%)
    const distance = this.calculateDistance(
      coordinator.location,
      doctor.location
    );
    if (distance <= 50) {
      score += 0.2 * (1 - distance / 50);
    }
    
    // 경력 호환성 (20%)
    const experienceScore = Math.min(
      Math.abs(coordinator.experience - doctor.experience) / 10,
      1
    );
    score += 0.2 * (1 - experienceScore);
    
    // 평점 (20%)
    if (doctor.averageRating >= 3.0) {
      score += 0.2 * (doctor.averageRating / 5.0);
    }
    
    return score;
  }
}
```

## 검색 및 필터링 규칙

### 의료진 검색 조건
```typescript
interface MedicalProfessionalSearchCriteria {
  specialty: string[]; // 전문 분야
  location: {
    city: string;
    district: string;
    radius: number; // km
  };
  rating: {
    min: number;
    max: number;
  };
  experience: {
    minYears: number;
    maxYears: number;
  };
  availability: {
    timeSlots: string[];
    daysOfWeek: number[];
  };
  hospitalAffiliation: string[];
}

class MedicalProfessionalSearchService {
  async searchDoctors(criteria: MedicalProfessionalSearchCriteria): Promise<Doctor[]> {
    let query = this.doctorRepository.createQuery();
    
    // 전문 분야 필터
    if (criteria.specialty.length > 0) {
      query = query.whereIn('specialty', criteria.specialty);
    }
    
    // 지역 필터
    if (criteria.location.city) {
      query = query.where('city', criteria.location.city);
    }
    
    if (criteria.location.district) {
      query = query.where('district', criteria.location.district);
    }
    
    // 평점 필터
    if (criteria.rating.min) {
      query = query.where('averageRating', '>=', criteria.rating.min);
    }
    
    if (criteria.rating.max) {
      query = query.where('averageRating', '<=', criteria.rating.max);
    }
    
    // 경력 필터
    if (criteria.experience.minYears) {
      query = query.where('yearsOfExperience', '>=', criteria.experience.minYears);
    }
    
    if (criteria.experience.maxYears) {
      query = query.where('yearsOfExperience', '<=', criteria.experience.maxYears);
    }
    
    // 병원 소속 필터
    if (criteria.hospitalAffiliation.length > 0) {
      query = query.whereIn('hospitalAffiliation', criteria.hospitalAffiliation);
    }
    
    return await query.execute();
  }
}
```

## 보안 및 접근 제어

### 역할 기반 접근 제어
```typescript
enum UserRole {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  COORDINATOR = 'coordinator',
  PATIENT = 'patient'
}

interface Permission {
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    { resource: 'user', action: 'read' },
    { resource: 'user', action: 'write' },
    { resource: 'user', action: 'delete' },
    { resource: 'review', action: 'read' },
    { resource: 'review', action: 'write' },
    { resource: 'review', action: 'delete' }
  ],
  [UserRole.DOCTOR]: [
    { resource: 'user', action: 'read', conditions: { own: true } },
    { resource: 'user', action: 'write', conditions: { own: true } },
    { resource: 'review', action: 'read', conditions: { target: true } }
  ],
  [UserRole.COORDINATOR]: [
    { resource: 'user', action: 'read', conditions: { own: true } },
    { resource: 'user', action: 'write', conditions: { own: true } },
    { resource: 'matching', action: 'read' },
    { resource: 'matching', action: 'write' }
  ],
  [UserRole.PATIENT]: [
    { resource: 'user', action: 'read', conditions: { own: true } },
    { resource: 'user', action: 'write', conditions: { own: true } },
    { resource: 'review', action: 'read' },
    { resource: 'review', action: 'write' }
  ]
};

class AuthorizationService {
  hasPermission(
    userRole: UserRole,
    resource: string,
    action: string,
    context?: any
  ): boolean {
    const permissions = ROLE_PERMISSIONS[userRole];
    const permission = permissions.find(
      p => p.resource === resource && p.action === action
    );
    
    if (!permission) {
      return false;
    }
    
    // 조건 검사
    if (permission.conditions) {
      return this.checkConditions(permission.conditions, context);
    }
    
    return true;
  }
  
  private checkConditions(conditions: Record<string, any>, context: any): boolean {
    if (conditions.own && context.userId !== context.targetUserId) {
      return false;
    }
    
    if (conditions.target && context.userId !== context.reviewTargetId) {
      return false;
    }
    
    return true;
  }
}
```

## 에러 코드 및 메시지

### 의료계 특화 에러 코드
```typescript
enum MedicalErrorCodes {
  // 인증 관련
  INVALID_MEDICAL_LICENSE = 'INVALID_MEDICAL_LICENSE',
  LICENSE_NOT_VERIFIED = 'LICENSE_NOT_VERIFIED',
  EXPIRED_LICENSE = 'EXPIRED_LICENSE',
  
  // 권한 관련
  INSUFFICIENT_MEDICAL_PERMISSIONS = 'INSUFFICIENT_MEDICAL_PERMISSIONS',
  SPECIALTY_MISMATCH = 'SPECIALTY_MISMATCH',
  
  // 데이터 관련
  INVALID_MEDICAL_DATA = 'INVALID_MEDICAL_DATA',
  DUPLICATE_MEDICAL_RECORD = 'DUPLICATE_MEDICAL_RECORD',
  MEDICAL_RECORD_NOT_FOUND = 'MEDICAL_RECORD_NOT_FOUND',
  
  // 비즈니스 로직 관련
  REVIEW_NOT_ALLOWED = 'REVIEW_NOT_ALLOWED',
  MATCHING_NOT_AVAILABLE = 'MATCHING_NOT_AVAILABLE',
  INVALID_SPECIALTY = 'INVALID_SPECIALTY',
  HOSPITAL_AFFILIATION_REQUIRED = 'HOSPITAL_AFFILIATION_REQUIRED'
}

const ERROR_MESSAGES: Record<MedicalErrorCodes, string> = {
  [MedicalErrorCodes.INVALID_MEDICAL_LICENSE]: '유효하지 않은 의료 라이선스 번호입니다',
  [MedicalErrorCodes.LICENSE_NOT_VERIFIED]: '의료 라이선스가 인증되지 않았습니다',
  [MedicalErrorCodes.EXPIRED_LICENSE]: '만료된 의료 라이선스입니다',
  [MedicalErrorCodes.INSUFFICIENT_MEDICAL_PERMISSIONS]: '의료진 권한이 부족합니다',
  [MedicalErrorCodes.SPECIALTY_MISMATCH]: '전문 분야가 일치하지 않습니다',
  [MedicalErrorCodes.INVALID_MEDICAL_DATA]: '유효하지 않은 의료 데이터입니다',
  [MedicalErrorCodes.DUPLICATE_MEDICAL_RECORD]: '중복된 의료 기록입니다',
  [MedicalErrorCodes.MEDICAL_RECORD_NOT_FOUND]: '의료 기록을 찾을 수 없습니다',
  [MedicalErrorCodes.REVIEW_NOT_ALLOWED]: '리뷰 작성이 허용되지 않습니다',
  [MedicalErrorCodes.MATCHING_NOT_AVAILABLE]: '매칭이 불가능합니다',
  [MedicalErrorCodes.INVALID_SPECIALTY]: '유효하지 않은 전문 분야입니다',
  [MedicalErrorCodes.HOSPITAL_AFFILIATION_REQUIRED]: '병원 소속 정보가 필요합니다'
};
```

