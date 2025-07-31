# Agently Monorepo

병원 평가 플랫폼 통합 monorepo

## 프로젝트 구성

### 🏥 김실장넷 (siljangkim)
병원 상담실장과 코디네이터 평가 플랫폼
- **URL**: localhost:3000 (개발), siljangkim.com (배포)
- **대상**: 상담실장, 코디네이터
- **사용자**: 병원 관계자 (의사면허증/사업자번호 인증)

### 👨‍⚕️ 김원장넷 (wonjangkim)  
의료계 종사자들을 위한 정보 플랫폼
- **URL**: localhost:3001 (개발), wonjangkim.com (배포)
- **대상**: 의사, 원장, 의료진
- **사용자**: 의료계 종사자 (의사면허증/사업자번호 인증)

## 아키텍처

### Monorepo 구조
```
agently-monorepo/
├── apps/
│   ├── siljangkim/              # 김실장넷 Next.js 앱
│   └── wonjangkim/              # 김원장넷 Next.js 앱
├── packages/
│   ├── domain/                  # 공유 도메인 모델
│   ├── application/             # 공유 비즈니스 로직
│   └── infrastructure/          # 공유 데이터 액세스
└── docs/                        # 프로젝트 문서
```

### 공유 패키지
- **@agently/domain**: 엔티티, 값 객체, 리포지토리 인터페이스
- **@agently/application**: 유스케이스, 비즈니스 로직
- **@agently/infrastructure**: Prisma, 데이터베이스, 외부 서비스

## 개발 환경

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

# 빌드
pnpm build              # 모든 앱 빌드
```

### 환경 변수 설정

각 앱의 `.env.local` 파일 설정:

#### apps/siljangkim/.env.local
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/agently?schema=public"
AUTH_SECRET="your-auth-secret"
AUTH_URL="http://localhost:3000"
```

#### apps/wonjangkim/.env.local (김원장넷)
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/agently?schema=public"
AUTH_SECRET="your-auth-secret"
AUTH_URL="http://localhost:3001"
CRAWL_DELAY_MS=1000
CRAWL_MAX_PAGES=100
```

## 기술 스택

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 3

### Backend  
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- NextAuth.js v5

### 개발 도구
- pnpm workspace
- ESLint + Prettier
- Husky (Git hooks)

## 도메인 모델

### 공유 엔티티
- **Hospital**: 병원 정보
- **User**: 사용자 (병원 관계자)
- **Review**: 평가 (범용)
- **ReviewTarget**: 평가 대상 (추상)

### 특화 엔티티
- **Doctor**: 의사 (wonjangkim에서 주로 사용)
- **Coordinator**: 상담실장/코디 (siljangkim에서 주로 사용)

### 미러링 커뮤니티 구조
- **김실장넷**: 상담실장/코디네이터 중심 커뮤니티
- **김원장넷**: 의사/원장 중심 커뮤니티
- **공통점**: 의료계 종사자 인증 필수, 상호 평가 시스템, 폐쇄형 커뮤니티

## 배포 전략

### Vercel 배포 (권장)
각 앱을 독립적으로 배포:
```bash
# 김실장넷 배포
cd apps/siljangkim && vercel

# 김원장넷 배포  
cd apps/wonjangkim && vercel
```

### Docker 배포
```dockerfile
# Multi-stage build for each app
FROM node:20-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter siljangkim build
EXPOSE 3000
CMD ["pnpm", "--filter", "siljangkim", "start"]
```

## 개발 워크플로우

### 새 기능 개발
1. 도메인 모델 변경 → `packages/domain`
2. 비즈니스 로직 추가 → `packages/application`  
3. 데이터 접근 구현 → `packages/infrastructure`
4. UI 구현 → `apps/siljangkim` 또는 `apps/wonjangkim`

### 패키지 의존성
```
apps/siljangkim ──┐
                  ├──→ @agently/application ──→ @agently/domain
apps/wonjangkim ──┘        ↓
                      @agently/infrastructure ──→ @agently/domain
```

## 스크립트 명령어

### 루트 레벨
- `pnpm dev`: 모든 앱 개발 서버 실행
- `pnpm build`: 모든 앱 빌드
- `pnpm lint`: 모든 패키지 린트 검사
- `pnpm test`: 모든 패키지 테스트 실행

### 데이터베이스
- `pnpm db:generate`: Prisma 클라이언트 생성
- `pnpm db:push`: DB 스키마 동기화
- `pnpm db:migrate`: 마이그레이션 실행

### 개별 앱
- `pnpm --filter siljangkim dev`: 김실장넷만 실행
- `pnpm --filter wonjangkim build`: 원장김넷만 빌드

## 문제 해결

### 의존성 문제
```bash
# 캐시 정리
pnpm store prune

# 재설치
rm -rf node_modules && pnpm install
```

### Prisma 문제
```bash
# 클라이언트 재생성
pnpm db:generate

# DB 초기화
pnpm db:push --force-reset
```

## 기여 가이드

1. 기능별 브랜치 생성
2. 해당 패키지에서 개발
3. 타입 검사: `pnpm typecheck`
4. 린트 검사: `pnpm lint`
5. 테스트: `pnpm test`
6. PR 생성

## 라이선스

Private - Agently (에이젠틀리)