# Agently 의료계 커뮤니티 플랫폼 Monorepo

## 프로젝트 개요
의료계 종사자들을 위한 미러링 커뮤니티 플랫폼을 위한 통합 monorepo입니다.
- **김실장넷 (siljangkim)**: 상담실장/코디네이터 중심 커뮤니티 플랫폼
- **김원장넷 (wonjangkim)**: 의사/원장 중심 커뮤니티 플랫폼

### 주요 특징
- **Monorepo 아키텍처**: 코드 공유 및 통합 관리
- **DDD 아키텍처**: 도메인 중심 설계
- **미러링 커뮤니티**: 두 사이트가 동일한 구조로 다른 직군 대상
- **타입 안정성**: TypeScript strict mode

## 기술 스택
- **Frontend**: Next.js 15, React 19, TypeScript 5, Tailwind CSS 3
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (공유)
- **Authentication**: NextAuth.js v5
- **Package Manager**: pnpm workspace
- **Architecture**: Domain-Driven Design (DDD)

## Monorepo 구조
```
agently-monorepo/
├── apps/
│   ├── siljangkim/              # 김실장넷 (포트 3000)
│   └── wonjangkim/              # 김원장넷 (포트 3001)
├── packages/
│   ├── domain/                  # @agently/domain
│   ├── application/             # @agently/application
│   └── infrastructure/          # @agently/infrastructure
├── docs/                        # 통합 문서
└── .claude/                     # Claude 설정 (향후)
```

## 도메인 모델
### 공유 엔티티
- **Hospital**: 병원 정보
- **User**: 사용자 (의료계 종사자)
- **Review**: 평가 (범용, 다형성)
- **ReviewTarget**: 평가 대상 (추상 기본 클래스)

### 특화 엔티티
- **Doctor**: 의사 (ReviewTarget 상속)
- **Coordinator**: 상담실장/코디네이터 (ReviewTarget 상속)

## 커뮤니티 구조

### 김실장넷 (apps/siljangkim)
- **대상**: 병원 상담실장, 코디네이터
- **사용자**: 병원 관계자 (의사면허증/사업자번호 인증 필수)
- **특징**: 폐쇄형 커뮤니티, 상호 평가 시스템
- **평가 메트릭**: 전문성, 소통능력, 책임감, 협업능력, 친절도
- **디자인**: 전문적인 파란색 테마

### 김원장넷 (apps/wonjangkim)
- **대상**: 병원 의사, 원장, 의료진
- **사용자**: 의료계 종사자 (의사면허증/사업자번호 인증 필수)
- **특징**: 폐쇄형 커뮤니티, 상호 평가 시스템
- **평가 메트릭**: 전문성, 소통능력, 책임감, 협업능력, 친절도
- **디자인**: 20-40대 여성 타겟의 핑크/퍼플 테마

### 공통 특징
- **인증 시스템**: 의사면허증 또는 사업자번호 인증 필수
- **상호 평가**: 평가를 작성해야 다른 평가 열람 가능 (JobPlanet 방식)
- **익명성 보장**: 평가 작성자의 신원 보호
- **미러링 구조**: 동일한 기능, 다른 직군 대상

## 개발 환경 설정

### 필수 요구사항
- Node.js 20+
- pnpm 9+
- PostgreSQL 15+

### 설치 및 실행
```bash
# 의존성 설치
pnpm install

# Prisma 클라이언트 생성
pnpm db:generate

# 데이터베이스 마이그레이션
pnpm db:migrate

# 개발 서버 실행
pnpm dev                # 두 사이트 동시 실행
pnpm dev:siljang       # 김실장넷만 (포트 3000)
pnpm dev:wonjang       # 김원장넷만 (포트 3001)
```

### 환경 변수
각 앱의 `.env.local` 파일에 설정:
```bash
# 공통 (동일한 DB 사용)
DATABASE_URL="postgresql://user:password@localhost:5432/agently?schema=public"
AUTH_SECRET="your-auth-secret"

# 사이트별
AUTH_URL="http://localhost:3000"  # siljangkim
AUTH_URL="http://localhost:3001"  # wonjangkim
```

## 패키지 구성

### @agently/domain
- **Entities**: User, Hospital, Doctor, Coordinator, Review, ReviewTarget
- **Value Objects**: Email, UserId, HospitalId, DoctorId, etc.
- **Repository Interfaces**: IUserRepository, IHospitalRepository, etc.
- **Domain Services**: UserVerificationService, ReviewAccessService

### @agently/application  
- **Use Cases**: RegisterUserUseCase, LoginUserUseCase, CreateReviewUseCase, etc.
- **DTOs**: 애플리케이션 간 데이터 전송 객체

### @agently/infrastructure
- **Repositories**: Prisma 구현체들
- **Services**: PasswordService, JWTTokenService
- **Database**: Prisma 클라이언트 및 스키마

## 개발 워크플로우

### 새 기능 개발 순서
1. **도메인 모델** 변경 → `packages/domain`
2. **비즈니스 로직** 추가 → `packages/application`
3. **데이터 접근** 구현 → `packages/infrastructure`
4. **UI 구현** → 해당 앱 (`apps/siljangkim` 또는 `apps/wonjangkim`)

### Import 규칙
```typescript
// 도메인 모델
import { User, Hospital, Doctor } from '@agently/domain'

// 비즈니스 로직
import { CreateUserUseCase } from '@agently/application'

// 인프라
import { prisma, PrismaUserRepository } from '@agently/infrastructure'
```

## 스크립트 명령어

### 루트 레벨 스크립트
```bash
pnpm dev              # 모든 앱 병렬 실행
pnpm build            # 모든 앱 빌드
pnpm lint             # 모든 패키지 린트
pnpm test             # 모든 패키지 테스트
```

### 데이터베이스 스크립트
```bash
pnpm db:generate      # Prisma 클라이언트 생성
pnpm db:push          # 스키마 동기화
pnpm db:migrate       # 마이그레이션 실행
```

### 개별 앱 스크립트
```bash
pnpm --filter siljangkim dev     # 김실장넷만
pnpm --filter wonjangkim build   # 김원장넷 빌드만
```

## 배포 전략

### Vercel 배포 (권장)
각 앱을 독립적으로 배포:
```bash
cd apps/siljangkim && vercel --prod
cd apps/wonjangkim && vercel --prod
```

### 환경별 설정
- **개발**: localhost:3000 (김실장넷), localhost:3001 (김원장넷)
- **스테이징**: staging-siljang.vercel.app, staging-wonjang.vercel.app
- **프로덕션**: siljangkim.com, wonjangkim.com

## 보안 고려사항
- 모든 사용자 입력 검증 (Zod 스키마 사용)
- SQL Injection 방지 (Prisma ORM)
- XSS 방지 (React 자동 이스케이핑)
- CSRF 보호 (NextAuth.js)
- 환경 변수를 통한 민감 정보 관리

## 법적 사항
- **운영 주체**: 에이젠틀리 (개인사업자)
- **대표**: 황준엽
- **준수 사항**: 개인정보보호법, 의료법, 명예훼손 방지

## TODO
- [ ] 검증 API 구현 (실제 의사면허/사업자번호)
- [ ] 파일 업로드 처리 (인증 서류)
- [ ] 관리자 승인 프로세스
- [ ] 이메일 알림 기능
- [ ] 신고 기능 구현
- [ ] 통계 대시보드

## 문제 해결

### 의존성 문제
```bash
pnpm store prune
rm -rf node_modules && pnpm install
```

### Prisma 문제
```bash
pnpm db:generate
pnpm db:push --force-reset
```

### 개발 서버 포트 충돌
- siljangkim: 포트 3000
- wonjangkim: 포트 3001
- 필요시 package.json에서 포트 변경 가능