# 김실장넷 기술 사양서

## 1. 아키텍처 개요

김실장넷은 Domain-Driven Design (DDD) 원칙을 따르는 계층형 아키텍처로 구현되었습니다.

### 1.1 아키텍처 레이어

```
┌─────────────────────────────────────────────────┐
│              Presentation Layer                  │
│  (Next.js Pages, Components, Server Actions)    │
├─────────────────────────────────────────────────┤
│              Application Layer                   │
│            (Use Cases, DTOs)                    │
├─────────────────────────────────────────────────┤
│               Domain Layer                       │
│   (Entities, Value Objects, Domain Services)    │
├─────────────────────────────────────────────────┤
│            Infrastructure Layer                  │
│    (Repositories, External Services, DB)        │
└─────────────────────────────────────────────────┘
```

### 1.2 의존성 방향
- 모든 의존성은 안쪽(도메인)을 향함
- 도메인 레이어는 외부 의존성이 없음
- 인터페이스를 통한 의존성 역전

## 2. 도메인 모델

### 2.1 핵심 엔티티

#### User (사용자)
```typescript
class User {
  - id: UserId
  - email: Email
  - password: string
  - name: string
  - hospitalName: string
  - role: UserRole
  - verificationStatus: VerificationStatus
  - medicalLicenseNumber?: MedicalLicenseNumber
  - businessNumber?: BusinessNumber
  - verificationDocuments: string[]
}
```

#### Coordinator (상담실장/코디네이터)
```typescript
class Coordinator {
  - id: CoordinatorId
  - name: string
  - hospitalName: string
  - position?: string
  - department?: string
  - phoneNumber?: PhoneNumber
  - email?: Email
}
```

#### Review (평가)
```typescript
class Review {
  - id: ReviewId
  - coordinatorId: CoordinatorId
  - authorId: UserId
  - ratings: ReviewRatings
  - workYear?: number
  - workDuration?: string
  - title: string
  - content: string
  - isAnonymous: boolean
}
```

### 2.2 값 객체 (Value Objects)

값 객체는 도메인의 불변성과 무결성을 보장합니다:

- **Email**: 이메일 형식 검증
- **UserId, CoordinatorId, ReviewId**: UUID 형식의 식별자
- **Rating**: 1-5 범위의 평점
- **MedicalLicenseNumber**: 5-6자리 의사면허번호
- **BusinessNumber**: 10자리 사업자번호 (체크섬 검증)
- **PhoneNumber**: 한국 전화번호 형식

### 2.3 도메인 서비스

#### ReviewAccessService
평가 열람 권한 관리:
- 인증된 사용자만 접근 가능
- 평가 작성자만 열람 가능 규칙 적용

#### UserVerificationService
사용자 인증 처리:
- 의사면허번호 검증
- 사업자번호 검증

## 3. 애플리케이션 레이어

### 3.1 유스케이스

#### 인증 관련
- **RegisterUserUseCase**: 회원가입 처리
- **LoginUserUseCase**: 로그인 처리

#### 평가 관련
- **CreateReviewUseCase**: 평가 작성
- **GetReviewsUseCase**: 평가 조회

### 3.2 DTO (Data Transfer Objects)

유스케이스와 프레젠테이션 레이어 간의 데이터 전송:
```typescript
interface RegisterUserDTO {
  email: string
  password: string
  name: string
  hospitalName: string
  verificationType: 'medical' | 'business'
  medicalLicenseNumber?: string
  businessNumber?: string
  verificationDocuments: string[]
}
```

## 4. 인프라스트럭처 레이어

### 4.1 리포지토리 구현

#### PrismaUserRepository
- Prisma ORM을 사용한 User 엔티티 영속성 관리
- 도메인 모델과 데이터베이스 모델 간 매핑

### 4.2 외부 서비스

#### JWTTokenService
- JWT 토큰 생성 및 검증

#### MockVerificationService
- 의사면허/사업자번호 검증 인터페이스
- 실제 구현은 외부 API 연동 예정

## 5. 프레젠테이션 레이어

### 5.1 Next.js App Router 구조

```
app/
├── (auth)/          # 인증 관련 페이지
│   ├── login/
│   └── register/
├── (legal)/         # 법적 고지사항
│   ├── terms/
│   ├── privacy/
│   └── disclaimer/
├── (main)/          # 메인 서비스
│   ├── reviews/
│   └── coordinators/
└── api/             # API 엔드포인트
```

### 5.2 Server Actions

NextAuth.js와 통합된 서버 액션:
- `authenticate`: 로그인 처리
- `registerUser`: 회원가입 처리

### 5.3 컴포넌트 구조

재사용 가능한 UI 컴포넌트:
- **RadarChart**: 5개 메트릭 시각화
- **Rating**: 별점 표시 및 입력
- **Card**: 재사용 가능한 카드 레이아웃

## 6. 데이터베이스 설계

### 6.1 스키마 구조

```prisma
model User {
  id                    String
  email                 String @unique
  password              String
  name                  String
  hospitalName          String
  role                  UserRole
  verificationStatus    VerificationStatus
  medicalLicenseNumber  String? @unique
  businessNumber        String? @unique
  verificationDocuments String[]
  reviews               Review[]
  viewedReviews         ReviewView[]
}

model Review {
  id                    String
  coordinatorId         String
  authorId              String
  professionalismRating Int
  communicationRating   Int
  responsibilityRating  Int
  cooperationRating     Int
  kindnessRating        Int
  title                 String
  content               String @db.Text
  isAnonymous           Boolean @default(true)
  views                 ReviewView[]
}
```

### 6.2 인덱스 전략

- User: email, verificationStatus
- Coordinator: name + hospitalName
- Review: coordinatorId, authorId, createdAt

## 7. 보안 고려사항

### 7.1 인증 및 권한

- NextAuth.js v5를 통한 세션 관리
- JWT 토큰 기반 인증
- 미들웨어를 통한 라우트 보호

### 7.2 데이터 보호

- 비밀번호 bcrypt 해싱
- SQL Injection 방지 (Prisma ORM)
- XSS 방지 (React 자동 이스케이핑)
- CSRF 보호 (NextAuth.js)

### 7.3 개인정보 보호

- 익명 평가 시스템
- 최소한의 개인정보 수집
- 암호화된 데이터 전송 (HTTPS)

## 8. 성능 최적화

### 8.1 데이터베이스 최적화

- 적절한 인덱스 설정
- N+1 문제 방지 (Prisma include)
- 페이지네이션 구현

### 8.2 프론트엔드 최적화

- Next.js 자동 코드 스플리팅
- 이미지 최적화 (Next/Image)
- 서버 컴포넌트 활용

## 9. 확장성 고려사항

### 9.1 수평 확장

- Stateless 설계
- 데이터베이스 연결 풀링
- 캐싱 전략 (Redis 추가 가능)

### 9.2 기능 확장

- 플러그인 가능한 검증 서비스
- 이벤트 기반 아키텍처 준비
- 마이크로서비스 전환 가능 구조

## 10. 모니터링 및 로깅

### 10.1 로깅 전략

- 구조화된 로그 (JSON 형식)
- 로그 레벨 관리
- 민감 정보 필터링

### 10.2 모니터링

- 애플리케이션 성능 모니터링
- 에러 추적
- 사용자 행동 분석 (개인정보 보호 준수)