# 김원장넷 (wonjangkim) 💖

의료계 종사자들을 위한 정보 플랫폼

## 프로젝트 개요

김원장넷은 의사, 원장, 의료진 등 의료계 종사자들을 위한 폐쇄형 커뮤니티 플랫폼입니다.
김실장넷과 미러링 구조로, 동일한 기능을 의료진 관점에서 제공합니다.

## 주요 특징

- 🏥 **폐쇄형 커뮤니티**: 의사면허증/사업자번호 인증 필수
- 💬 **상호 평가 시스템**: 평가 작성 후 열람 가능
- 👩‍⚕️ **의료진 중심**: 의사, 원장, 의료진 대상
- ✨ **여성 친화적 디자인**: 20-40대 여성 타겟
- 📱 **반응형 디자인**: 모바일 최적화
- 🔒 **익명성 보장**: 평가 작성자 신원 보호

## 대상 사용자

- **주 사용자**: 의사, 원장, 의료진
- **인증 방법**: 의사면허증 또는 사업자번호 인증
- **타겟층**: 20-40대 여성 의료진
- **커뮤니티 성격**: 폐쇄형, 전문직 중심

## 평가 시스템

### 5가지 평가 메트릭
1. **전문성**: 의료 지식 및 기술 수준
2. **소통능력**: 환자 및 동료와의 의사소통
3. **책임감**: 업무에 대한 책임 의식
4. **협업능력**: 팀워크 및 협력 능력
5. **친절도**: 환자 응대 및 인간관계

### 평가 방식
- **상호 평가**: 평가를 작성해야 다른 평가 열람 가능 (JobPlanet 방식)
- **익명 보장**: 평가 작성자의 신원 완전 보호
- **검증된 평가**: 인증된 의료계 종사자만 평가 작성 가능

## Development

```bash
# Install dependencies
pnpm install

# Start development server (port 3001)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with pink/purple theme
- **State Management**: React Context + Hooks
- **Database**: Shared PostgreSQL with siljangkim
- **Authentication**: NextAuth.js v5
- **Architecture**: DDD with workspace packages (@agently/*)

## Design System

### Color Scheme
- **Primary**: Pink gradient (#f472b6 to #a855f7)
- **Secondary**: Purple tones (#a855f7 to #7c3aed)
- **Background**: Soft gradients with rounded elements
- **Accent**: Rose tones for highlights

### UI Components
- **Rounded Design**: All elements have soft, rounded corners
- **Gradient Buttons**: Pink to purple gradients
- **Emoji Integration**: Friendly emoji usage throughout
- **Soft Shadows**: Subtle shadow effects for depth
- **Feminine Typography**: Friendly, approachable font styling

## Environment Variables

Create `.env.local` file:

```bash
# Database (shared with siljangkim)
DATABASE_URL="postgresql://user:password@localhost:5432/agently?schema=public"

# Authentication
AUTH_SECRET="your-auth-secret"
AUTH_URL="http://localhost:3001"

# App-specific
NEXT_PUBLIC_APP_NAME="김원장넷"
NEXT_PUBLIC_APP_DESCRIPTION="의료계 종사자들을 위한 정보 플랫폼"
```

## 김실장넷과의 관계

### 공통점
- **동일한 도메인 모델**: User, Hospital, Review 등 공유
- **같은 인증 시스템**: 의료계 종사자 인증 필수
- **동일한 평가 방식**: 5가지 메트릭, 상호 평가 시스템
- **같은 보안 정책**: 익명성 보장, 개인정보 보호

### 차이점
- **타겟 사용자**: 의사/원장 vs 상담실장/코디네이터
- **디자인 테마**: 핑크/퍼플 vs 블루
- **사용자 경험**: 여성 친화적 vs 전문적 비즈니스
- **포트**: 3001 vs 3000

## 미러링 커뮤니티 구조

김원장넷과 김실장넷은 의료계 내 다른 직군을 대상으로 하는 미러링 커뮤니티입니다:

- **김원장넷**: 의사, 원장 중심 커뮤니티
- **김실장넷**: 상담실장, 코디네이터 중심 커뮤니티
- **상호 보완**: 의료계 전체 생태계를 포괄하는 플랫폼