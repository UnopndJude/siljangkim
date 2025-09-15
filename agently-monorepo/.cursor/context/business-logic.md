# 비즈니스 로직 (Business Logic)

## 사용자 관리 비즈니스 로직

### 사용자 등록 프로세스

#### 1. 기본 정보 검증
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

#### 2. 역할별 추가 검증
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

### 사용자 인증 프로세스

#### 1. 로그인 검증
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

#### 2. 토큰 관리
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

## 리뷰 시스템 비즈니스 로직

### 리뷰 작성 규칙

#### 1. 작성 자격 검증
```typescript
interface ReviewEligibility {
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
    notRecent: boolean; // 최근 리뷰 작성 제한
  };
}
```

#### 2. 리뷰 내용 검증
```typescript
interface ReviewContentValidation {
  rating: {
    min: number; // 1점
    max: number; // 5점
    required: boolean;
  };
  content: {
    minLength: number; // 최소 10자
    maxLength: number; // 최대 500자
    language: string[]; // 허용된 언어
    profanity: boolean; // 욕설 필터링
    medicalAccuracy: boolean; // 의료적 정확성 검증
  };
  categories: {
    required: boolean; // 카테고리 필수
    allowedValues: string[]; // 허용된 카테고리
  };
  images: {
    maxCount: number; // 최대 3장
    maxSize: number; // 최대 5MB
    allowedTypes: string[]; // 허용된 이미지 타입
  };
}
```

#### 3. 리뷰 승인 프로세스
```typescript
interface ReviewApprovalProcess {
  automatic: {
    conditions: {
      rating: number; // 3점 이상
      contentLength: number; // 최소 20자
      noProfanity: boolean; // 욕설 없음
      noPersonalInfo: boolean; // 개인정보 없음
    };
  };
  manual: {
    conditions: {
      rating: number; // 3점 미만
      contentLength: number; // 20자 미만
      profanity: boolean; // 욕설 포함
      personalInfo: boolean; // 개인정보 포함
      reported: boolean; // 신고됨
    };
  };
}
```

### 리뷰 통계 계산

#### 1. 평점 계산
```typescript
interface RatingCalculation {
  average: {
    method: 'weighted'; // 가중 평균
    weights: {
      recent: number; // 최근 리뷰 가중치
      verified: number; // 인증된 사용자 가중치
      detailed: number; // 상세 리뷰 가중치
    };
  };
  distribution: {
    calculate: boolean; // 분포 계산
    categories: string[]; // 카테고리별 분포
  };
  trends: {
    calculate: boolean; // 트렌드 계산
    period: string; // 기간 (월별, 분기별)
  };
}
```

#### 2. 리뷰 신뢰도 계산
```typescript
interface ReviewTrustScore {
  factors: {
    userVerification: number; // 사용자 인증 상태
    reviewHistory: number; // 리뷰 작성 이력
    contentQuality: number; // 내용 품질
    responseRate: number; // 의료진 응답률
  };
  weights: {
    userVerification: 0.3;
    reviewHistory: 0.2;
    contentQuality: 0.3;
    responseRate: 0.2;
  };
}
```

## 매칭 시스템 비즈니스 로직

### 코디네이터-의사 매칭

#### 1. 매칭 조건 검증
```typescript
interface MatchingConditions {
  specialty: {
    match: boolean; // 전문 분야 일치
    required: boolean; // 필수 조건
  };
  location: {
    proximity: number; // 거리 제한 (km)
    preferred: boolean; // 선호 지역
  };
  availability: {
    timeOverlap: boolean; // 시간 겹침
    scheduleMatch: boolean; // 일정 일치
  };
  experience: {
    minYears: number; // 최소 경력
    maxYears: number; // 최대 경력
  };
  rating: {
    minRating: number; // 최소 평점
    minReviews: number; // 최소 리뷰 수
  };
}
```

#### 2. 매칭 알고리즘
```typescript
interface MatchingAlgorithm {
  scoring: {
    specialty: number; // 전문 분야 일치 점수
    location: number; // 지역 근접성 점수
    availability: number; // 가용성 점수
    experience: number; // 경력 점수
    rating: number; // 평점 점수
    compatibility: number; // 호환성 점수
  };
  weights: {
    specialty: 0.3;
    location: 0.2;
    availability: 0.2;
    experience: 0.1;
    rating: 0.1;
    compatibility: 0.1;
  };
  threshold: number; // 최소 매칭 점수
}
```

#### 3. 매칭 상태 관리
```typescript
interface MatchingStatus {
  pending: {
    duration: number; // 대기 시간 (일)
    autoExpire: boolean; // 자동 만료
  };
  approved: {
    notification: boolean; // 알림 발송
    confirmation: boolean; // 확인 요청
  };
  rejected: {
    reason: string[]; // 거부 사유
    feedback: boolean; // 피드백 요청
  };
  expired: {
    cleanup: boolean; // 정리 작업
    archive: boolean; // 아카이브
  };
}
```

### 환자-의료진 연결

#### 1. 연결 요청 검증
```typescript
interface ConnectionRequestValidation {
  patient: {
    authenticated: boolean; // 인증된 환자
    notBlocked: boolean; // 차단되지 않음
    limitNotExceeded: boolean; // 연결 제한 초과 안함
  };
  medicalProfessional: {
    exists: boolean; // 의료진 존재
    active: boolean; // 활성 상태
    acceptingRequests: boolean; // 요청 수락 중
  };
  request: {
    notDuplicate: boolean; // 중복 요청 아님
    notRecent: boolean; // 최근 요청 제한
  };
}
```

#### 2. 연결 관리
```typescript
interface ConnectionManagement {
  status: {
    pending: boolean; // 대기 중
    approved: boolean; // 승인됨
    rejected: boolean; // 거부됨
    expired: boolean; // 만료됨
  };
  actions: {
    approve: boolean; // 승인 가능
    reject: boolean; // 거부 가능
    expire: boolean; // 만료 가능
    archive: boolean; // 아카이브 가능
  };
  notifications: {
    statusChange: boolean; // 상태 변경 알림
    reminder: boolean; // 리마인더 알림
    followUp: boolean; // 후속 알림
  };
}
```

## 검색 및 필터링 비즈니스 로직

### 검색 알고리즘

#### 1. 텍스트 검색
```typescript
interface TextSearch {
  fields: {
    name: boolean; // 이름 검색
    specialty: boolean; // 전문 분야 검색
    hospital: boolean; // 소속 병원 검색
    introduction: boolean; // 소개 검색
  };
  algorithm: {
    type: 'fuzzy'; // 퍼지 검색
    threshold: number; // 유사도 임계값
    boost: {
      exact: number; // 정확한 일치 가중치
      partial: number; // 부분 일치 가중치
      fuzzy: number; // 퍼지 일치 가중치
    };
  };
}
```

#### 2. 필터링 로직
```typescript
interface FilteringLogic {
  specialty: {
    exact: boolean; // 정확한 일치
    multiple: boolean; // 다중 선택
    hierarchy: boolean; // 계층 구조
  };
  location: {
    radius: number; // 반경 검색 (km)
    administrative: boolean; // 행정구역 검색
    coordinate: boolean; // 좌표 기반 검색
  };
  rating: {
    min: number; // 최소 평점
    max: number; // 최대 평점
    distribution: boolean; // 분포 고려
  };
  availability: {
    timeSlot: boolean; // 시간대 검색
    dayOfWeek: boolean; // 요일 검색
    recurring: boolean; // 반복 일정 검색
  };
}
```

#### 3. 정렬 알고리즘
```typescript
interface SortingAlgorithm {
  criteria: {
    rating: boolean; // 평점순
    reviewCount: boolean; // 리뷰 수순
    experience: boolean; // 경력순
    distance: boolean; // 거리순
    relevance: boolean; // 관련성순
  };
  weights: {
    rating: 0.3;
    reviewCount: 0.2;
    experience: 0.2;
    distance: 0.1;
    relevance: 0.2;
  };
  fallback: string; // 기본 정렬 기준
}
```

## 알림 시스템 비즈니스 로직

### 알림 트리거

#### 1. 리뷰 관련 알림
```typescript
interface ReviewNotifications {
  newReview: {
    target: 'medicalProfessional'; // 의료진에게
    channel: ['email', 'push', 'sms']; // 알림 채널
    template: 'review_received'; // 알림 템플릿
  };
  reviewApproved: {
    target: 'reviewer'; // 리뷰 작성자에게
    channel: ['email', 'push'];
    template: 'review_approved';
  };
  reviewRejected: {
    target: 'reviewer'; // 리뷰 작성자에게
    channel: ['email', 'push'];
    template: 'review_rejected';
  };
}
```

#### 2. 매칭 관련 알림
```typescript
interface MatchingNotifications {
  matchingRequest: {
    target: 'coordinator'; // 코디네이터에게
    channel: ['email', 'push', 'sms'];
    template: 'matching_request';
  };
  matchingApproved: {
    target: 'doctor'; // 의사에게
    channel: ['email', 'push'];
    template: 'matching_approved';
  };
  matchingRejected: {
    target: 'coordinator'; // 코디네이터에게
    channel: ['email', 'push'];
    template: 'matching_rejected';
  };
}
```

### 알림 설정 관리

#### 1. 사용자별 알림 설정
```typescript
interface UserNotificationSettings {
  email: {
    enabled: boolean;
    frequency: 'immediate' | 'daily' | 'weekly';
    types: string[]; // 알림 유형
  };
  push: {
    enabled: boolean;
    frequency: 'immediate' | 'batched';
    types: string[];
  };
  sms: {
    enabled: boolean;
    frequency: 'immediate' | 'daily';
    types: string[];
  };
}
```

#### 2. 알림 전송 규칙
```typescript
interface NotificationDeliveryRules {
  rateLimit: {
    perUser: number; // 사용자당 시간당 제한
    perType: number; // 유형당 시간당 제한
    global: number; // 전체 시간당 제한
  };
  timing: {
    businessHours: boolean; // 업무 시간만 전송
    timezone: string; // 사용자 시간대 고려
    quietHours: string[]; // 조용한 시간대
  };
  content: {
    personalization: boolean; // 개인화
    localization: boolean; // 현지화
    templating: boolean; // 템플릿 사용
  };
}
```

## 데이터 보안 및 개인정보 보호

### 개인정보 처리 규칙

#### 1. 데이터 분류
```typescript
interface DataClassification {
  public: {
    description: '공개 정보';
    examples: ['이름', '전문 분야', '소속 병원'];
    protection: 'basic';
  };
  internal: {
    description: '내부 정보';
    examples: ['이메일', '전화번호', '경력'];
    protection: 'encrypted';
  };
  confidential: {
    description: '기밀 정보';
    examples: ['의료 라이선스 번호', '개인 식별 정보'];
    protection: 'strong_encryption';
  };
  restricted: {
    description: '제한 정보';
    examples: ['의료 기록', '진료 정보'];
    protection: 'maximum_encryption';
  };
}
```

#### 2. 접근 권한 관리
```typescript
interface AccessControl {
  roles: {
    admin: {
      permissions: ['read', 'write', 'delete', 'manage'];
      dataAccess: 'all';
    };
    medicalProfessional: {
      permissions: ['read', 'write'];
      dataAccess: 'own_data';
    };
    patient: {
      permissions: ['read', 'write'];
      dataAccess: 'own_data';
    };
    guest: {
      permissions: ['read'];
      dataAccess: 'public_only';
    };
  };
  rules: {
    principleOfLeastPrivilege: boolean; // 최소 권한 원칙
    roleBasedAccess: boolean; // 역할 기반 접근
    attributeBasedAccess: boolean; // 속성 기반 접근
  };
}
```

### 데이터 암호화

#### 1. 암호화 전략
```typescript
interface EncryptionStrategy {
  atRest: {
    algorithm: 'AES-256-GCM';
    keyManagement: 'AWS KMS';
    rotation: 'automatic';
  };
  inTransit: {
    protocol: 'TLS 1.3';
    cipherSuites: string[];
    certificateManagement: 'automatic';
  };
  inUse: {
    homomorphic: boolean; // 동형 암호화
    fieldLevel: boolean; // 필드 레벨 암호화
    tokenization: boolean; // 토큰화
  };
}
```

#### 2. 키 관리
```typescript
interface KeyManagement {
  generation: {
    algorithm: 'RSA-4096';
    entropy: 'high';
    randomness: 'cryptographically_secure';
  };
  storage: {
    location: 'HSM'; // 하드웨어 보안 모듈
    backup: 'multiple_locations';
    access: 'role_based';
  };
  rotation: {
    frequency: '90_days';
    automatic: boolean;
    notification: boolean;
  };
}
```

## 성능 최적화 비즈니스 로직

### 캐싱 전략

#### 1. 캐시 계층
```typescript
interface CacheStrategy {
  L1: {
    type: 'in_memory';
    size: '100MB';
    ttl: '5_minutes';
    use: 'frequent_queries';
  };
  L2: {
    type: 'redis';
    size: '1GB';
    ttl: '1_hour';
    use: 'database_queries';
  };
  L3: {
    type: 'CDN';
    size: 'unlimited';
    ttl: '24_hours';
    use: 'static_content';
  };
}
```

#### 2. 캐시 무효화
```typescript
interface CacheInvalidation {
  strategies: {
    timeBased: boolean; // 시간 기반
    eventBased: boolean; // 이벤트 기반
    versionBased: boolean; // 버전 기반
  };
  events: {
    userUpdate: string[]; // 사용자 업데이트 시 무효화
    reviewCreate: string[]; // 리뷰 생성 시 무효화
    matchingUpdate: string[]; // 매칭 업데이트 시 무효화
  };
  patterns: {
    wildcard: boolean; // 와일드카드 패턴
    regex: boolean; // 정규식 패턴
    exact: boolean; // 정확한 일치
  };
}
```

### 데이터베이스 최적화

#### 1. 쿼리 최적화
```typescript
interface QueryOptimization {
  indexing: {
    strategy: 'composite'; // 복합 인덱스
    fields: string[]; // 인덱스 필드
    order: 'selectivity'; // 선택성 순서
  };
  querying: {
    pagination: 'cursor_based'; // 커서 기반 페이지네이션
    filtering: 'index_friendly'; // 인덱스 친화적 필터링
    sorting: 'index_optimized'; // 인덱스 최적화 정렬
  };
  connection: {
    pooling: boolean; // 연결 풀링
    maxConnections: number; // 최대 연결 수
    timeout: number; // 타임아웃
  };
}
```

#### 2. 읽기 전용 복제본
```typescript
interface ReadReplica {
  strategy: 'master_slave';
  replicas: {
    count: number; // 복제본 수
    location: string[]; // 복제본 위치
    lag: number; // 지연 시간
  };
  routing: {
    readQueries: 'replica'; // 읽기 쿼리는 복제본
    writeQueries: 'master'; // 쓰기 쿼리는 마스터
    failover: 'automatic'; // 자동 장애 조치
  };
}
```
