# 김실장넷 보안 가이드라인

## 1. 개요

이 문서는 김실장넷 서비스의 보안을 유지하기 위한 가이드라인을 제공합니다.

## 2. 인증 및 권한 관리

### 2.1 사용자 인증

#### NextAuth.js 설정
```typescript
// 세션 만료 시간 설정
export const authOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7일
  },
  jwt: {
    secret: process.env.AUTH_SECRET,
  }
}
```

#### 비밀번호 정책
- 최소 8자 이상
- 대소문자, 숫자, 특수문자 포함 권장
- bcrypt rounds: 10 이상

### 2.2 권한 검증

#### 미들웨어를 통한 라우트 보호
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')
  
  if (!token && request.nextUrl.pathname.startsWith('/protected')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
```

#### API 엔드포인트 보호
```typescript
// API route 예시
export async function POST(request: Request) {
  const session = await auth()
  
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // 추가 권한 검증
  if (session.user.verificationStatus !== 'VERIFIED') {
    return Response.json({ error: 'Not verified' }, { status: 403 })
  }
}
```

## 3. 데이터 보호

### 3.1 개인정보 암호화

#### 민감 정보 암호화
```typescript
import crypto from 'crypto'

const algorithm = 'aes-256-gcm'
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex')

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  const authTag = cipher.getAuthTag()
  
  return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted
}
```

### 3.2 데이터베이스 보안

#### Connection Pooling
```typescript
// lib/prisma.ts
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

#### SQL Injection 방지
```typescript
// 안전한 쿼리 작성
const users = await prisma.$queryRaw`
  SELECT * FROM users 
  WHERE email = ${email}
`

// 위험한 방식 (사용 금지)
// const users = await prisma.$queryRawUnsafe(
//   `SELECT * FROM users WHERE email = '${email}'`
// )
```

## 4. 입력 검증

### 4.1 서버 측 검증

#### Zod를 활용한 스키마 검증
```typescript
import { z } from 'zod'

const reviewSchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(20).max(1000),
  ratings: z.object({
    professionalism: z.number().min(1).max(5),
    communication: z.number().min(1).max(5),
    responsibility: z.number().min(1).max(5),
    cooperation: z.number().min(1).max(5),
    kindness: z.number().min(1).max(5),
  }),
  isAnonymous: z.boolean(),
})

export async function createReview(data: unknown) {
  const validated = reviewSchema.parse(data)
  // 검증된 데이터로 처리
}
```

### 4.2 XSS 방지

#### React의 자동 이스케이핑
```typescript
// 안전 - React가 자동으로 이스케이핑
<div>{userInput}</div>

// 위험 - dangerouslySetInnerHTML 사용 시 주의
<div dangerouslySetInnerHTML={{ __html: sanitizeHtml(userInput) }} />
```

#### Content Security Policy
```typescript
// next.config.js
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`

module.exports = {
  headers: async () => [{
    source: '/:path*',
    headers: [{
      key: 'Content-Security-Policy',
      value: cspHeader.replace(/\n/g, ''),
    }],
  }],
}
```

## 5. 세션 관리

### 5.1 세션 보안

#### 쿠키 설정
```typescript
// 보안 쿠키 옵션
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7, // 7일
  path: '/',
}
```

#### 세션 무효화
```typescript
// 로그아웃 시 세션 완전 삭제
export async function logout() {
  await signOut({ redirect: false })
  cookies().delete('auth-token')
}
```

## 6. API 보안

### 6.1 Rate Limiting

#### 구현 예시
```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 분당 10회
})

export async function middleware(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return new Response('Too Many Requests', { status: 429 })
  }
}
```

### 6.2 CORS 설정

```typescript
// API route에서 CORS 헤더 설정
export async function POST(request: Request) {
  const response = NextResponse.json({ data: 'success' })
  
  response.headers.set('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  return response
}
```

## 7. 파일 업로드 보안

### 7.1 파일 검증

```typescript
const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
const maxSize = 5 * 1024 * 1024 // 5MB

export function validateFile(file: File): boolean {
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type')
  }
  
  if (file.size > maxSize) {
    throw new Error('File too large')
  }
  
  return true
}
```

### 7.2 파일명 처리

```typescript
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

export function generateSafeFilename(originalName: string): string {
  const ext = path.extname(originalName)
  const safeExt = ext.toLowerCase().replace(/[^a-z0-9.]/g, '')
  return `${uuidv4()}${safeExt}`
}
```

## 8. 로깅 및 모니터링

### 8.1 보안 이벤트 로깅

```typescript
interface SecurityLog {
  event: 'login' | 'logout' | 'failed_login' | 'permission_denied'
  userId?: string
  ip: string
  userAgent: string
  timestamp: Date
  details?: Record<string, any>
}

export async function logSecurityEvent(log: SecurityLog) {
  // 로그 저장 (데이터베이스 또는 로깅 서비스)
  await prisma.securityLog.create({ data: log })
  
  // 의심스러운 활동 감지
  if (log.event === 'failed_login') {
    const recentFailures = await prisma.securityLog.count({
      where: {
        event: 'failed_login',
        ip: log.ip,
        timestamp: {
          gte: new Date(Date.now() - 15 * 60 * 1000) // 15분
        }
      }
    })
    
    if (recentFailures > 5) {
      // 알림 발송 또는 IP 차단
    }
  }
}
```

### 8.2 에러 처리

```typescript
// 프로덕션에서는 상세 에러 정보 숨기기
export function sanitizeError(error: unknown): string {
  if (process.env.NODE_ENV === 'production') {
    console.error('Error:', error) // 서버 로그에만 기록
    return 'An error occurred. Please try again later.'
  }
  
  return error instanceof Error ? error.message : 'Unknown error'
}
```

## 9. 의존성 관리

### 9.1 정기적인 업데이트

```bash
# 취약점 검사
npm audit

# 자동 수정
npm audit fix

# 의존성 업데이트 확인
npm outdated
```

### 9.2 의존성 검증

```json
// package.json
{
  "scripts": {
    "preinstall": "npx only-allow npm",
    "postinstall": "npm audit"
  }
}
```

## 10. 배포 보안 체크리스트

- [ ] 환경 변수 안전하게 설정
- [ ] HTTPS 활성화
- [ ] 디버그 모드 비활성화
- [ ] 에러 메시지에서 민감 정보 제거
- [ ] 보안 헤더 설정
- [ ] 데이터베이스 연결 암호화
- [ ] 백업 암호화
- [ ] 로그에서 민감 정보 제거
- [ ] 최신 보안 패치 적용
- [ ] 침입 탐지 시스템 설정

## 11. 사고 대응 계획

### 11.1 보안 사고 발생 시

1. **즉시 조치**
   - 영향받은 서비스 격리
   - 추가 피해 방지

2. **조사**
   - 로그 분석
   - 침해 범위 파악

3. **복구**
   - 취약점 패치
   - 시스템 복구

4. **사후 조치**
   - 사용자 통지
   - 재발 방지 대책 수립

### 11.2 연락처

- 보안 담당자: security@agently.com
- 긴급 연락처: [TODO: 전화번호 추가]