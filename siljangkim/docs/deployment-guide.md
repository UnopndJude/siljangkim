# 김실장넷 배포 가이드

## 1. 사전 요구사항

- Node.js 18.17 이상
- PostgreSQL 13 이상
- Vercel 계정 (추천) 또는 다른 호스팅 서비스

## 2. 환경 변수 설정

### 2.1 필수 환경 변수

```bash
# 데이터베이스
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# 인증
AUTH_SECRET="최소 32자 이상의 랜덤 문자열"
AUTH_URL="https://your-domain.com"

# JWT
JWT_SECRET="최소 32자 이상의 랜덤 문자열"

# 외부 API (선택사항)
MEDICAL_LICENSE_API_KEY=""
BUSINESS_NUMBER_API_KEY=""
```

### 2.2 환경 변수 생성 방법

```bash
# AUTH_SECRET 생성
openssl rand -base64 32

# JWT_SECRET 생성
openssl rand -base64 32
```

## 3. 데이터베이스 설정

### 3.1 PostgreSQL 설정

1. 데이터베이스 생성:
```sql
CREATE DATABASE siljangkim;
```

2. 사용자 생성 및 권한 부여:
```sql
CREATE USER siljangkim_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE siljangkim TO siljangkim_user;
```

### 3.2 Prisma 마이그레이션

```bash
# 프로덕션 데이터베이스 URL 설정
export DATABASE_URL="postgresql://..."

# 마이그레이션 실행
npx prisma migrate deploy

# Prisma Client 생성
npx prisma generate
```

## 4. Vercel 배포

### 4.1 Vercel CLI 설치

```bash
npm i -g vercel
```

### 4.2 프로젝트 연결

```bash
vercel
```

### 4.3 환경 변수 설정

Vercel 대시보드에서 설정하거나 CLI 사용:

```bash
vercel env add DATABASE_URL production
vercel env add AUTH_SECRET production
vercel env add AUTH_URL production
vercel env add JWT_SECRET production
```

### 4.4 배포

```bash
# 프로덕션 배포
vercel --prod

# 프리뷰 배포
vercel
```

## 5. 수동 배포 (VPS/EC2)

### 5.1 서버 준비

```bash
# Node.js 설치 (Ubuntu)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# PostgreSQL 설치
sudo apt-get install postgresql postgresql-contrib

# PM2 설치 (프로세스 관리)
npm install -g pm2
```

### 5.2 애플리케이션 설정

```bash
# 코드 클론
git clone https://github.com/your-repo/siljangkim.git
cd siljangkim

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.production
nano .env.production

# 빌드
npm run build
```

### 5.3 PM2로 실행

```bash
# ecosystem.config.js 생성
module.exports = {
  apps: [{
    name: 'siljangkim',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}

# 실행
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 5.4 Nginx 설정

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 6. Docker 배포

### 6.1 Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### 6.2 docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/siljangkim
      - AUTH_SECRET=${AUTH_SECRET}
      - AUTH_URL=http://localhost:3000
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=siljangkim
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

## 7. 모니터링 설정

### 7.1 헬스 체크 엔드포인트

`/api/health` 엔드포인트 생성:

```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    // 데이터베이스 연결 확인
    await prisma.$queryRaw`SELECT 1`
    
    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return Response.json({
      status: 'unhealthy',
      error: error.message
    }, { status: 503 })
  }
}
```

### 7.2 로깅

프로덕션 환경에서는 구조화된 로깅 사용:

```typescript
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})
```

## 8. 보안 체크리스트

- [ ] HTTPS 설정 (Let's Encrypt)
- [ ] 환경 변수 안전하게 관리
- [ ] 데이터베이스 백업 설정
- [ ] Rate limiting 설정
- [ ] CORS 정책 설정
- [ ] CSP 헤더 설정
- [ ] 정기적인 의존성 업데이트

## 9. 성능 최적화

### 9.1 Next.js 최적화

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['your-cdn.com'],
  },
  compress: true,
  poweredByHeader: false,
}
```

### 9.2 데이터베이스 최적화

```sql
-- 인덱스 생성
CREATE INDEX idx_reviews_coordinator ON reviews(coordinator_id);
CREATE INDEX idx_reviews_author ON reviews(author_id);
CREATE INDEX idx_users_email ON users(email);
```

## 10. 배포 후 확인사항

1. 모든 페이지 접근 테스트
2. 회원가입/로그인 프로세스
3. 평가 작성 및 조회
4. 이미지 업로드 (구현 시)
5. 이메일 발송 (구현 시)
6. 에러 페이지 표시
7. 모바일 반응형 확인

## 11. 롤백 계획

문제 발생 시 빠른 롤백을 위한 준비:

1. 이전 버전 태그 관리
2. 데이터베이스 백업
3. 환경 변수 백업
4. 배포 스크립트 준비

```bash
# 롤백 스크립트 예시
#!/bin/bash
git checkout v1.0.0
npm install
npm run build
pm2 restart siljangkim
```