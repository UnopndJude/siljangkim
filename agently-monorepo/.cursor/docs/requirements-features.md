# 상세 기능 요구사항

## 사용자 관리 기능

### 1. 사용자 등록/로그인
```typescript
interface UserRegistration {
  email: string; // 이메일 인증 필수
  password: string; // 최소 8자, 영문+숫자+특수문자
  name: string; // 실명
  phoneNumber: string; // 한국 전화번호 형식
  role: 'doctor' | 'coordinator' | 'patient';
  agreeToTerms: boolean; // 이용약관 동의
  agreeToPrivacy: boolean; // 개인정보처리방침 동의
}

interface UserLogin {
  email: string;
  password: string;
  rememberMe?: boolean; // 자동 로그인
}
```

### 2. 프로필 관리
```typescript
interface UserProfile {
  basicInfo: {
    name: string;
    email: string;
    phoneNumber: string;
    profileImage?: string;
  };
  medicalInfo?: {
    medicalLicenseNumber?: string; // 의사만
    specialty?: string; // 의사, 코디네이터
    yearsOfExperience?: number;
    hospitalAffiliation?: string; // 의사만
    introduction?: string;
  };
  preferences: {
    language: 'ko' | 'en';
    timezone: string;
    notificationSettings: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
}
```

### 3. 소셜 로그인
- Google OAuth 2.0 연동
- Naver OAuth 2.0 연동
- 기존 계정과 연동 기능

## 의료진 관리 기능

### 1. 의사 등록 및 관리
```typescript
interface DoctorRegistration {
  medicalLicenseNumber: string; // MD + 6자리 숫자
  specialty: MedicalSpecialty; // 전문 분야
  yearsOfExperience: number; // 경력
  hospitalAffiliation: string; // 소속 병원/클리닉
  introduction: string; // 자기소개
  availableHours: {
    [key: string]: string[]; // 요일별 진료 시간
  };
  languages: string[]; // 사용 가능 언어
  education: {
    degree: string;
    university: string;
    graduationYear: number;
  }[];
  certifications: {
    name: string;
    issuingOrganization: string;
    issueDate: Date;
  }[];
}
```

### 2. 코디네이터 등록 및 관리
```typescript
interface CoordinatorRegistration {
  specialty: MedicalSpecialty; // 전문 분야
  yearsOfExperience: number; // 경력
  introduction: string; // 자기소개
  availableHours: {
    [key: string]: string[]; // 요일별 상담 시간
  };
  languages: string[]; // 사용 가능 언어
  education: {
    degree: string;
    university: string;
    graduationYear: number;
  }[];
  certifications: {
    name: string;
    issuingOrganization: string;
    issueDate: Date;
  }[];
  networkSize: number; // 연결된 의료진 수
}
```

### 3. 의료진 인증 시스템
- 의료 라이선스 번호 검증
- 보건복지부 API 연동
- 전문의 자격 검증
- 소속 병원 확인

## 리뷰 시스템 기능

### 1. 리뷰 작성
```typescript
interface ReviewCreation {
  targetId: string; // 리뷰 대상 ID
  targetType: 'doctor' | 'coordinator';
  rating: number; // 1-5점
  content: string; // 리뷰 내용 (10-500자)
  categories: {
    quality: number; // 진료 품질 (1-5점)
    kindness: number; // 친절도 (1-5점)
    waitingTime: number; // 대기시간 (1-5점)
    facility: number; // 시설 환경 (1-5점)
  };
  isAnonymous: boolean; // 익명 여부
  images?: string[]; // 첨부 이미지 (최대 3장)
  visitDate?: Date; // 방문 날짜
  visitPurpose?: string; // 방문 목적
}
```

### 2. 리뷰 관리
```typescript
interface ReviewManagement {
  // 리뷰 조회
  getReviews: {
    targetId: string;
    targetType: 'doctor' | 'coordinator';
    filters: {
      rating?: number;
      dateRange?: { start: Date; end: Date };
      hasImages?: boolean;
    };
    pagination: {
      page: number;
      limit: number;
    };
  };
  
  // 리뷰 수정/삭제
  updateReview: {
    reviewId: string;
    content?: string;
    rating?: number;
    categories?: Partial<ReviewCategories>;
  };
  
  deleteReview: {
    reviewId: string;
    reason?: string; // 삭제 사유
  };
}
```

### 3. 리뷰 검증 및 승인
- 자동 욕설 필터링
- 의료법 위반 내용 검사
- 관리자 승인 프로세스
- 신고 및 검토 시스템

## 매칭 시스템 기능

### 1. 코디네이터-의사 매칭
```typescript
interface CoordinatorDoctorMatching {
  request: {
    coordinatorId: string;
    doctorId: string;
    message: string; // 매칭 요청 메시지
    preferredSpecialty: string; // 선호 전문 분야
  };
  
  response: {
    matchingId: string;
    status: 'pending' | 'approved' | 'rejected';
    message?: string; // 응답 메시지
    approvedAt?: Date;
  };
  
  management: {
    listMatches: {
      userId: string;
      status?: MatchingStatus;
      pagination: PaginationOptions;
    };
    updateStatus: {
      matchingId: string;
      status: MatchingStatus;
      message?: string;
    };
  };
}
```

### 2. 환자-의료진 연결
```typescript
interface PatientMedicalProfessionalConnection {
  consultation: {
    patientId: string;
    medicalProfessionalId: string;
    type: 'doctor' | 'coordinator';
    purpose: string; // 상담 목적
    preferredDate?: Date;
    preferredTime?: string;
    message: string; // 상담 요청 메시지
  };
  
  response: {
    connectionId: string;
    status: 'pending' | 'accepted' | 'declined';
    responseMessage?: string;
    suggestedDate?: Date;
    suggestedTime?: string;
  };
}
```

## 검색 및 필터링 기능

### 1. 의료진 검색
```typescript
interface MedicalProfessionalSearch {
  basicSearch: {
    query: string; // 검색어
    type: 'doctor' | 'coordinator' | 'all';
    location?: string; // 지역
  };
  
  advancedSearch: {
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
    languages: string[];
  };
  
  sorting: {
    criteria: 'rating' | 'experience' | 'distance' | 'reviews';
    order: 'asc' | 'desc';
  };
}
```

### 2. 실시간 검색 제안
- 검색어 자동완성
- 인기 검색어 표시
- 최근 검색어 기록
- 검색 결과 개수 표시

## 알림 시스템 기능

### 1. 알림 유형
```typescript
interface NotificationTypes {
  review: {
    newReview: boolean; // 새 리뷰 알림
    reviewApproved: boolean; // 리뷰 승인 알림
    reviewRejected: boolean; // 리뷰 거부 알림
  };
  
  matching: {
    matchingRequest: boolean; // 매칭 요청 알림
    matchingApproved: boolean; // 매칭 승인 알림
    matchingRejected: boolean; // 매칭 거부 알림
  };
  
  system: {
    maintenance: boolean; // 시스템 점검 알림
    policyUpdate: boolean; // 정책 변경 알림
    securityAlert: boolean; // 보안 알림
  };
}
```

### 2. 알림 채널
- 이메일 알림
- 푸시 알림
- SMS 알림
- 인앱 알림

## 파일 관리 기능

### 1. 이미지 업로드
```typescript
interface ImageUpload {
  types: ['profile', 'review', 'certificate'];
  constraints: {
    maxSize: number; // 5MB
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif'];
    maxCount: number; // 프로필: 1개, 리뷰: 3개
  };
  processing: {
    resize: boolean;
    compression: boolean;
    watermark: boolean; // 리뷰 이미지에만
  };
}
```

### 2. 파일 보안
- 바이러스 스캔
- 이미지 메타데이터 제거
- 개인정보 마스킹
- 접근 권한 관리

## 관리자 기능

### 1. 사용자 관리
- 사용자 목록 조회
- 사용자 계정 활성화/비활성화
- 사용자 정보 수정
- 사용자 삭제

### 2. 리뷰 관리
- 리뷰 승인/거부
- 부적절한 리뷰 삭제
- 리뷰 통계 조회
- 리뷰 신고 처리

### 3. 시스템 관리
- 시스템 설정 관리
- 알림 템플릿 관리
- 로그 조회 및 분석
- 백업 및 복구

