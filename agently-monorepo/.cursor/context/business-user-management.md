# 사용자 관리 비즈니스 로직

## 사용자 등록 프로세스

### 1. 기본 정보 검증
```typescript
interface UserRegistrationValidation {
  email: {
    format: RegExp; // 이메일 형식 검증
    uniqueness: boolean; // 중복 검사
    domain: string[]; // 허용된 도메인 목록
  };
  password: {
    minLength: number; // 최소 8자
    complexity: RegExp; // 영문+숫자+특수문자
    history: number; // 이전 비밀번호 재사용 방지
  };
  phoneNumber: {
    format: RegExp; // 한국 전화번호 형식
    uniqueness: boolean; // 중복 검사
  };
}
```

### 2. 역할별 추가 검증
```typescript
// 의사 등록 시 추가 검증
interface DoctorRegistrationValidation {
  medicalLicenseNumber: {
    format: RegExp; // MD + 6자리 숫자
    validity: boolean; // 보건복지부 검증
    uniqueness: boolean; // 중복 검사
  };
  specialty: {
    allowedValues: string[]; // 허용된 전문 분야
    required: boolean;
  };
  hospitalAffiliation: {
    required: boolean;
    maxLength: number; // 최대 100자
  };
}

// 코디네이터 등록 시 추가 검증
interface CoordinatorRegistrationValidation {
  specialty: {
    allowedValues: string[]; // 허용된 전문 분야
    required: boolean;
  };
  experience: {
    minYears: number; // 최소 1년
    maxYears: number; // 최대 50년
  };
  certification: {
    required: boolean; // 자격증 필수
    validTypes: string[]; // 허용된 자격증 유형
  };
}
```

## 사용자 인증 프로세스

### 1. 로그인 검증
```typescript
interface LoginValidation {
  email: {
    exists: boolean; // 등록된 이메일인지 확인
    verified: boolean; // 이메일 인증 완료 여부
  };
  password: {
    correct: boolean; // 비밀번호 일치 여부
    notExpired: boolean; // 비밀번호 만료 여부
  };
  account: {
    active: boolean; // 계정 활성화 상태
    notLocked: boolean; // 계정 잠금 상태
  };
}
```

### 2. 토큰 관리
```typescript
interface TokenManagement {
  accessToken: {
    expiry: number; // 15분
    refreshable: boolean; // 갱신 가능
  };
  refreshToken: {
    expiry: number; // 7일
    rotation: boolean; // 토큰 회전
  };
  security: {
    maxRefreshAttempts: number; // 최대 갱신 시도 횟수
    ipValidation: boolean; // IP 주소 검증
  };
}
```

## 프로필 관리

### 1. 프로필 정보 업데이트
```typescript
interface ProfileUpdateRules {
  basicInfo: {
    name: {
      required: boolean;
      minLength: number;
      maxLength: number;
      pattern: RegExp; // 한글, 영문만 허용
    };
    phoneNumber: {
      format: RegExp; // 한국 전화번호 형식
      uniqueness: boolean;
    };
    profileImage: {
      maxSize: number; // 5MB
      allowedTypes: string[]; // jpg, png, gif
      dimensions: {
        maxWidth: number;
        maxHeight: number;
      };
    };
  };
  medicalInfo: {
    specialty: {
      allowedValues: string[];
      changeable: boolean; // 변경 가능 여부
    };
    experience: {
      minYears: number;
      maxYears: number;
      validation: boolean; // 경력 검증 필요
    };
    hospitalAffiliation: {
      required: boolean; // 의사만
      maxLength: number;
    };
  };
}
```

### 2. 프로필 공개 설정
```typescript
interface ProfileVisibilitySettings {
  public: {
    name: boolean;
    specialty: boolean;
    hospitalAffiliation: boolean;
    averageRating: boolean;
    reviewCount: boolean;
  };
  private: {
    email: boolean;
    phoneNumber: boolean;
    personalIntroduction: boolean;
    contactInformation: boolean;
  };
  conditional: {
    reviews: 'all' | 'verified_only' | 'none';
    contactRequests: 'all' | 'verified_only' | 'none';
    matchingRequests: 'all' | 'same_specialty' | 'none';
  };
}
```

## 권한 관리

### 1. 역할 기반 접근 제어
```typescript
interface RoleBasedAccessControl {
  roles: {
    admin: {
      permissions: ['read', 'write', 'delete', 'manage'];
      dataAccess: 'all';
      restrictions: [];
    };
    doctor: {
      permissions: ['read', 'write'];
      dataAccess: 'own_data';
      restrictions: ['cannot_delete_own_profile'];
    };
    coordinator: {
      permissions: ['read', 'write'];
      dataAccess: 'own_data';
      restrictions: ['cannot_delete_own_profile'];
    };
    patient: {
      permissions: ['read', 'write'];
      dataAccess: 'own_data';
      restrictions: ['cannot_delete_own_profile'];
    };
  };
  rules: {
    principleOfLeastPrivilege: boolean;
    roleBasedAccess: boolean;
    attributeBasedAccess: boolean;
  };
}
```

### 2. 동적 권한 검사
```typescript
interface DynamicPermissionCheck {
  context: {
    userId: string;
    targetUserId: string;
    resource: string;
    action: string;
    timestamp: Date;
    ipAddress: string;
  };
  conditions: {
    isOwner: boolean; // 소유자인지 확인
    isAdmin: boolean; // 관리자인지 확인
    isVerified: boolean; // 인증된 사용자인지 확인
    isActive: boolean; // 활성 계정인지 확인
    hasPermission: boolean; // 특정 권한 보유 여부
  };
  result: {
    allowed: boolean;
    reason?: string;
    alternativeActions?: string[];
  };
}
```

## 계정 보안

### 1. 비밀번호 정책
```typescript
interface PasswordPolicy {
  complexity: {
    minLength: number; // 8자
    maxLength: number; // 128자
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    forbiddenPatterns: string[]; // 금지된 패턴
  };
  history: {
    preventReuse: boolean;
    historyCount: number; // 최근 5개 비밀번호 재사용 방지
  };
  expiration: {
    enabled: boolean;
    maxAge: number; // 90일
    warningDays: number; // 만료 7일 전 경고
  };
  lockout: {
    maxAttempts: number; // 5회
    lockoutDuration: number; // 30분
    progressiveDelay: boolean; // 점진적 지연
  };
}
```

### 2. 계정 잠금 정책
```typescript
interface AccountLockoutPolicy {
  triggers: {
    failedLoginAttempts: number; // 5회 실패
    suspiciousActivity: boolean; // 의심스러운 활동
    adminAction: boolean; // 관리자 조치
    securityBreach: boolean; // 보안 침해
  };
  lockoutTypes: {
    temporary: {
      duration: number; // 30분
      autoUnlock: boolean;
    };
    permanent: {
      requiresAdmin: boolean;
      requiresVerification: boolean;
    };
  };
  unlockProcess: {
    adminUnlock: boolean;
    selfUnlock: boolean;
    verificationRequired: boolean;
    cooldownPeriod: number; // 24시간
  };
}
```

## 사용자 상태 관리

### 1. 계정 상태
```typescript
interface AccountStatus {
  states: {
    pending: {
      description: '이메일 인증 대기';
      allowedActions: ['verify_email', 'resend_verification'];
      restrictions: ['login', 'profile_update'];
    };
    active: {
      description: '정상 활성 상태';
      allowedActions: ['all'];
      restrictions: [];
    };
    suspended: {
      description: '일시 정지';
      allowedActions: ['view_profile'];
      restrictions: ['login', 'create_content', 'interact'];
    };
    banned: {
      description: '영구 정지';
      allowedActions: [];
      restrictions: ['all'];
    };
    deleted: {
      description: '계정 삭제';
      allowedActions: [];
      restrictions: ['all'];
    };
  };
  transitions: {
    pending_to_active: 'email_verification';
    active_to_suspended: 'admin_action' | 'policy_violation';
    suspended_to_active: 'admin_action' | 'appeal_approved';
    active_to_banned: 'severe_violation';
    any_to_deleted: 'user_request' | 'admin_action';
  };
}
```

### 2. 상태 변경 로직
```typescript
interface StatusChangeLogic {
  validation: {
    canChangeStatus: (from: AccountStatus, to: AccountStatus) => boolean;
    requiresApproval: (from: AccountStatus, to: AccountStatus) => boolean;
    requiresNotification: (from: AccountStatus, to: AccountStatus) => boolean;
  };
  sideEffects: {
    dataRetention: {
      suspended: 'retain_all';
      banned: 'retain_essential';
      deleted: 'anonymize_after_grace_period';
    };
    accessControl: {
      suspended: 'read_only';
      banned: 'no_access';
      deleted: 'no_access';
    };
    notifications: {
      user: boolean;
      admin: boolean;
      stakeholders: boolean;
    };
  };
}
```

## 데이터 보호 및 개인정보

### 1. 개인정보 분류
```typescript
interface PersonalDataClassification {
  public: {
    description: '공개 정보';
    examples: ['name', 'specialty', 'hospitalAffiliation'];
    protection: 'basic';
    retention: 'indefinite';
  };
  internal: {
    description: '내부 정보';
    examples: ['email', 'phoneNumber', 'experience'];
    protection: 'encrypted';
    retention: '7_years';
  };
  confidential: {
    description: '기밀 정보';
    examples: ['medicalLicenseNumber', 'personalId'];
    protection: 'strong_encryption';
    retention: '10_years';
  };
  restricted: {
    description: '제한 정보';
    examples: ['medicalRecords', 'treatmentHistory'];
    protection: 'maximum_encryption';
    retention: '30_years';
  };
}
```

### 2. 데이터 마스킹 규칙
```typescript
interface DataMaskingRules {
  email: {
    pattern: 'show_first_2_chars_and_domain';
    example: 'jo**@example.com';
  };
  phoneNumber: {
    pattern: 'show_first_3_and_last_4_digits';
    example: '010-****-5678';
  };
  medicalLicense: {
    pattern: 'show_first_2_and_last_2_chars';
    example: 'MD****56';
  };
  name: {
    pattern: 'show_first_char_and_last_char';
    example: '홍*동';
  };
  address: {
    pattern: 'show_city_and_district_only';
    example: '서울시 강남구';
  };
}
```

## 사용자 경험 최적화

### 1. 온보딩 프로세스
```typescript
interface OnboardingProcess {
  steps: {
    registration: {
      required: boolean;
      estimatedTime: number; // 2분
      fields: string[];
    };
    emailVerification: {
      required: boolean;
      estimatedTime: number; // 1분
      alternatives: ['sms_verification'];
    };
    profileSetup: {
      required: boolean;
      estimatedTime: number; // 5분
      fields: string[];
    };
    roleSpecificSetup: {
      required: boolean;
      estimatedTime: number; // 10분
      conditional: boolean;
    };
    preferences: {
      required: boolean;
      estimatedTime: number; // 2분
      fields: string[];
    };
  };
  progress: {
    tracking: boolean;
    saveProgress: boolean;
    resumeFromLastStep: boolean;
  };
}
```

### 2. 사용자 피드백 수집
```typescript
interface UserFeedbackCollection {
  triggers: {
    onboarding: 'after_completion';
    featureUsage: 'after_5_uses';
    errorEncounter: 'immediately';
    periodic: 'monthly';
  };
  methods: {
    inApp: boolean;
    email: boolean;
    sms: boolean;
    phone: boolean;
  };
  incentives: {
    points: boolean;
    badges: boolean;
    earlyAccess: boolean;
    discounts: boolean;
  };
}
```

