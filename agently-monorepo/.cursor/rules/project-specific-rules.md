# 프로젝트 특화 규칙 (Project-Specific Rules)

## Agently 의료계 커뮤니티 플랫폼 규칙

### 도메인 특화 규칙

#### 의료계 용어 사용
- 의료계 표준 용어 사용
- 의사, 코디네이터, 환자 등 역할별 명확한 구분
- 의료 라이선스 번호, 전문의 분야 등 의료계 특화 필드

```typescript
// 좋은 예
interface Doctor {
  medicalLicenseNumber: MedicalLicenseNumber;
  specialty: MedicalSpecialty;
  yearsOfExperience: number;
  hospitalAffiliation: string;
}

// 나쁜 예
interface Doctor {
  license: string;
  field: string;
  experience: number;
  hospital: string;
}
```

#### 개인정보 보호 규칙
- 의료 정보는 특별한 보안 처리 필요
- GDPR, 개인정보보호법 준수
- 민감한 정보는 암호화 저장

```typescript
// 개인정보 마스킹 예시
const maskPersonalInfo = (email: string): string => {
  const [username, domain] = email.split('@');
  const maskedUsername = username.substring(0, 2) + '*'.repeat(username.length - 2);
  return `${maskedUsername}@${domain}`;
};
```

### 비즈니스 로직 규칙

#### 리뷰 시스템 규칙
- 리뷰는 인증된 사용자만 작성 가능
- 의사/코디네이터는 자신에 대한 리뷰 작성 불가
- 리뷰 수정/삭제는 작성자만 가능
- 부적절한 리뷰는 관리자 승인 후 표시

```typescript
interface ReviewValidationRules {
  canUserWriteReview(userId: string, targetId: string): boolean;
  canUserModifyReview(userId: string, reviewId: string): boolean;
  isReviewContentAppropriate(content: string): boolean;
}
```

#### 코디네이터-의사 매칭 규칙
- 코디네이터는 특정 전문 분야만 담당
- 의사는 여러 코디네이터와 연결 가능
- 매칭은 상호 동의 후 성립

```typescript
interface MatchingRules {
  canCoordinatorHandleSpecialty(coordinatorId: string, specialty: string): boolean;
  isMatchingMutuallyAgreed(coordinatorId: string, doctorId: string): boolean;
  getAvailableCoordinatorsForSpecialty(specialty: string): Coordinator[];
}
```

### 데이터 검증 규칙

#### 의료 라이선스 번호 검증
```typescript
class MedicalLicenseValidator {
  static validate(licenseNumber: string): boolean {
    // 의료 라이선스 번호 형식 검증
    const pattern = /^[A-Z]{2}\d{6}$/;
    return pattern.test(licenseNumber);
  }
}
```

#### 이메일 도메인 검증
```typescript
class EmailDomainValidator {
  private static readonly ALLOWED_DOMAINS = [
    'hospital.co.kr',
    'clinic.co.kr',
    'medical.org',
    'healthcare.gov'
  ];

  static validate(email: string): boolean {
    const domain = email.split('@')[1];
    return this.ALLOWED_DOMAINS.includes(domain);
  }
}
```

### API 응답 규칙

#### 표준 응답 형식
```typescript
interface StandardApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}
```

#### 에러 코드 규칙
```typescript
enum ErrorCodes {
  // 인증 관련
  UNAUTHORIZED = 'AUTH_001',
  TOKEN_EXPIRED = 'AUTH_002',
  INVALID_CREDENTIALS = 'AUTH_003',
  
  // 권한 관련
  INSUFFICIENT_PERMISSIONS = 'PERM_001',
  ROLE_MISMATCH = 'PERM_002',
  
  // 데이터 관련
  VALIDATION_ERROR = 'DATA_001',
  DUPLICATE_ENTRY = 'DATA_002',
  NOT_FOUND = 'DATA_003',
  
  // 비즈니스 로직 관련
  REVIEW_NOT_ALLOWED = 'BIZ_001',
  MATCHING_NOT_AVAILABLE = 'BIZ_002',
  INVALID_MEDICAL_LICENSE = 'BIZ_003'
}
```

### 보안 규칙

#### 인증 토큰 관리
```typescript
interface TokenSecurityRules {
  accessTokenExpiry: number; // 15분
  refreshTokenExpiry: number; // 7일
  maxRefreshAttempts: number; // 3회
  tokenRotationRequired: boolean; // true
}
```

#### API 요청 제한
```typescript
interface RateLimitRules {
  loginAttempts: {
    max: number; // 5회
    windowMs: number; // 15분
  };
  apiRequests: {
    max: number; // 100회
    windowMs: number; // 1시간
  };
  reviewCreation: {
    max: number; // 10회
    windowMs: number; // 1일
  };
}
```

### 로깅 규칙

#### 로그 레벨별 사용
```typescript
// ERROR: 시스템 오류, 예외 상황
logger.error('Database connection failed', { error, timestamp });

// WARN: 비정상적이지만 처리 가능한 상황
logger.warn('User exceeded review limit', { userId, limit });

// INFO: 중요한 비즈니스 이벤트
logger.info('User created review', { userId, reviewId, targetId });

// DEBUG: 개발/디버깅 정보
logger.debug('API request processed', { endpoint, duration, statusCode });
```

#### 민감한 정보 로깅 금지
```typescript
// 금지: 개인정보 로깅
logger.info('User data', { email: 'user@example.com', phone: '010-1234-5678' });

// 허용: 식별자만 로깅
logger.info('User action', { userId: 'user_123', action: 'login' });
```

### 테스트 규칙

#### 테스트 데이터 관리
```typescript
// 테스트용 더미 데이터
const MOCK_DOCTOR_DATA = {
  id: 'doctor_test_001',
  name: '테스트 의사',
  medicalLicenseNumber: 'MD123456',
  specialty: '내과',
  // 실제 개인정보는 사용하지 않음
};

const MOCK_COORDINATOR_DATA = {
  id: 'coordinator_test_001',
  name: '테스트 코디네이터',
  specialty: '내과',
  // 실제 개인정보는 사용하지 않음
};
```

#### 테스트 격리
```typescript
describe('ReviewService', () => {
  beforeEach(() => {
    // 각 테스트마다 독립적인 데이터베이스 사용
    jest.clearAllMocks();
    setupTestDatabase();
  });

  afterEach(() => {
    // 테스트 후 정리
    cleanupTestDatabase();
  });
});
```

### 성능 규칙

#### 데이터베이스 쿼리 최적화
```typescript
// 좋은 예: 필요한 필드만 선택
const getUsers = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      // password는 제외
    }
  });
};

// 나쁜 예: 모든 필드 선택
const getUsers = () => {
  return prisma.user.findMany(); // password 등 불필요한 필드 포함
};
```

#### 캐싱 전략
```typescript
interface CacheStrategy {
  userProfile: {
    ttl: number; // 1시간
    key: string; // 'user:profile:{userId}'
  };
  reviewList: {
    ttl: number; // 30분
    key: string; // 'reviews:list:{page}:{limit}'
  };
  coordinatorSpecialties: {
    ttl: number; // 24시간
    key: string; // 'coordinators:specialties'
  };
}
```
