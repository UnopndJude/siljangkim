# 김실장넷 프로젝트

## 프로젝트 개요
김실장넷은 병원 상담실장과 코디네이터들에 대한 평판을 기록하는 커뮤니티 플랫폼입니다.

### 주요 특징
- **폐쇄형 커뮤니티**: 의사면허증 또는 사업자번호 인증을 통한 병원 관계자만 가입 가능
- **상호 평가 시스템**: 평가를 작성해야 다른 평가 열람 가능 (JobPlanet 방식)
- **익명성 보장**: 평가 작성자의 신원 보호
- **5가지 평가 메트릭**: 전문성, 소통능력, 책임감, 협업능력, 친절도

## 기술 스택
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js v5
- **Architecture**: Domain-Driven Design (DDD)

## 프로젝트 구조
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 인증 관련 페이지
│   ├── (legal)/           # 법적 고지사항 페이지
│   ├── (main)/            # 메인 서비스 페이지
│   ├── actions/           # Server Actions
│   └── api/               # API Routes
├── domain/                # 도메인 레이어
│   ├── entities/          # 엔티티
│   ├── value-objects/     # 값 객체
│   ├── repositories/      # 리포지토리 인터페이스
│   └── services/          # 도메인 서비스
├── application/           # 애플리케이션 레이어
│   └── use-cases/         # 유스케이스
├── infrastructure/        # 인프라스트럭처 레이어
│   ├── repositories/      # 리포지토리 구현체
│   └── services/          # 외부 서비스
├── components/            # UI 컴포넌트
└── lib/                   # 유틸리티 및 설정

```

## 주요 기능

### 1. 인증 시스템
- 2단계 회원가입 프로세스
- 의사면허증 또는 사업자번호 인증
- NextAuth.js를 활용한 세션 관리

### 2. 평가 시스템
- 5가지 메트릭 기반 평가
- 레이더 차트를 통한 시각화
- 익명 평가 기능
- 평가 작성 후 열람 가능

### 3. 검색 및 필터링
- 상담실장/코디네이터 검색
- 병원별, 직책별 필터링
- 평점순, 최신순 정렬

## 개발 환경 설정

### 환경 변수
`.env.local` 파일에 다음 환경 변수 설정 필요:
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/siljangkim?schema=public"

# Auth
AUTH_SECRET="your-auth-secret-here"
AUTH_URL="http://localhost:3000"

# JWT
JWT_SECRET="your-jwt-secret-here"
```

### 데이터베이스 설정
```bash
# Prisma 마이그레이션
npx prisma generate
npx prisma migrate dev

# 시드 데이터 (선택사항)
npx prisma db seed
```

## 개발 가이드

### 코드 스타일
- TypeScript strict mode 사용
- DDD 원칙 준수
- 값 객체를 통한 도메인 무결성 보장

### 테스트
```bash
# 유닛 테스트
npm run test

# E2E 테스트
npm run test:e2e
```

### 빌드 및 배포
```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build
npm run start

# Vercel 배포
vercel
```

## 보안 고려사항
- 모든 사용자 입력 검증
- SQL Injection 방지 (Prisma ORM 사용)
- XSS 방지 (React 자동 이스케이핑)
- CSRF 보호 (NextAuth.js)
- 환경 변수를 통한 민감 정보 관리

## 법적 사항
- 운영 주체: 에이젠틀리 (개인사업자, 대표: 황준엽)
- 개인정보보호법 준수
- 의료법 관련 규정 준수
- 명예훼손 방지를 위한 콘텐츠 관리

## Claude 자동 규칙 인지 시스템

이 프로젝트는 Claude가 문서의 규칙을 자동으로 인지하고 따르도록 설정되어 있습니다.

### 핵심 파일들
- `.claude/project-rules.md` - 코딩 컨벤션 및 아키텍처 규칙
- `.claude/context.md` - 프로젝트 컨텍스트 및 현재 상태
- `.claude/instructions.md` - Claude 작업 지침
- `docs/` - 상세 기술 문서

### 자동 검증
- GitHub Actions로 문서 검증
- 마크다운 링크 체크
- 기술 문서 구조 검증

## TODO
- [ ] 실제 의사면허/사업자번호 검증 API 연동
- [ ] 파일 업로드 기능 구현 (인증 서류)
- [ ] 관리자 승인 프로세스 구현
- [ ] 이메일 알림 기능
- [ ] 신고 기능 구현
- [ ] 통계 대시보드