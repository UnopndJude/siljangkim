# 개발 환경 설정 (Development Environment)

## 시스템 요구사항

### 최소 요구사항
- **OS**: macOS 12+, Windows 10+, Ubuntu 20.04+
- **Node.js**: 18.17.0 이상
- **npm**: 9.0.0 이상 또는 pnpm 8.0.0 이상
- **메모리**: 8GB RAM 이상
- **저장공간**: 10GB 이상 여유 공간

### 권장 요구사항
- **OS**: macOS 14+ (M1/M2 칩 권장)
- **Node.js**: 20.0.0 이상
- **메모리**: 16GB RAM 이상
- **저장공간**: 20GB 이상 여유 공간
- **IDE**: VS Code + Cursor

## 개발 도구 설치

### 1. Node.js 설치
```bash
# nvm을 사용한 Node.js 설치 (권장)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# 또는 공식 웹사이트에서 다운로드
# https://nodejs.org/
```

### 2. 패키지 매니저 설치
```bash
# pnpm 설치 (권장)
npm install -g pnpm

# 또는 npm 사용
npm install -g npm@latest
```

### 3. 데이터베이스 설치
```bash
# PostgreSQL 설치 (macOS)
brew install postgresql@15
brew services start postgresql@15

# PostgreSQL 설치 (Ubuntu)
sudo apt update
sudo apt install postgresql postgresql-contrib

# PostgreSQL 설치 (Windows)
# https://www.postgresql.org/download/windows/
```

### 4. Redis 설치
```bash
# Redis 설치 (macOS)
brew install redis
brew services start redis

# Redis 설치 (Ubuntu)
sudo apt install redis-server
sudo systemctl start redis-server

# Redis 설치 (Windows)
# https://github.com/microsoftarchive/redis/releases
```

## 프로젝트 설정

### 1. 저장소 클론
```bash
git clone https://github.com/your-org/agently-monorepo.git
cd agently-monorepo
```

### 2. 의존성 설치
```bash
# 루트 디렉토리에서
pnpm install

# 또는 npm 사용
npm install
```

### 3. 환경 변수 설정
```bash
# 루트 디렉토리에 .env 파일 생성
cp .env.example .env

# 각 앱별로 환경 변수 설정
cd apps/siljangkim
cp .env.example .env.local

cd ../wonjangkim
cp .env.example .env.local
```

### 4. 데이터베이스 설정
```bash
# 데이터베이스 생성
createdb agently_dev

# Prisma 마이그레이션 실행
cd packages/infrastructure
npx prisma migrate dev
npx prisma generate
```

## 개발 서버 실행

### 1. 전체 개발 서버 실행
```bash
# 루트 디렉토리에서
pnpm dev

# 또는 개별 실행
pnpm --filter siljangkim dev
pnpm --filter wonjangkim dev
```

### 2. 개별 서비스 실행
```bash
# siljangkim 앱 실행
cd apps/siljangkim
pnpm dev

# wonjangkim 앱 실행
cd apps/wonjangkim
pnpm dev

# API 서버 실행
cd packages/infrastructure
pnpm dev
```

## 개발 도구 설정

### 1. VS Code 확장 프로그램
```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "prisma.prisma",
    "ms-vscode.vscode-json",
    "redhat.vscode-yaml"
  ]
}
```

### 2. VS Code 설정
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

### 3. Prettier 설정
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### 4. ESLint 설정
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error"
  }
}
```

## 데이터베이스 관리

### 1. Prisma Studio 실행
```bash
cd packages/infrastructure
npx prisma studio
```

### 2. 데이터베이스 리셋
```bash
cd packages/infrastructure
npx prisma migrate reset
npx prisma db seed
```

### 3. 스키마 변경 후 마이그레이션
```bash
cd packages/infrastructure
npx prisma migrate dev --name "migration_name"
npx prisma generate
```

## 테스트 환경 설정

### 1. 테스트 데이터베이스 설정
```bash
# 테스트용 데이터베이스 생성
createdb agently_test

# 환경 변수 설정
export DATABASE_URL="postgresql://username:password@localhost:5432/agently_test"
```

### 2. 테스트 실행
```bash
# 전체 테스트 실행
pnpm test

# 특정 패키지 테스트
pnpm --filter domain test
pnpm --filter application test

# 테스트 커버리지
pnpm test:coverage
```

## 디버깅 설정

### 1. VS Code 디버그 설정
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/apps/siljangkim/node_modules/.bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}/apps/siljangkim",
      "console": "integratedTerminal"
    }
  ]
}
```

### 2. Chrome DevTools 디버깅
```bash
# 디버그 모드로 실행
NODE_OPTIONS='--inspect' pnpm dev
```

## 성능 모니터링

### 1. 번들 분석
```bash
# Next.js 번들 분석
cd apps/siljangkim
pnpm build
pnpm analyze

# 또는
ANALYZE=true pnpm build
```

### 2. 메모리 사용량 모니터링
```bash
# Node.js 메모리 사용량 확인
node --inspect --max-old-space-size=4096 server.js
```

## 배포 환경 설정

### 1. 프로덕션 빌드
```bash
# 전체 프로덕션 빌드
pnpm build

# 개별 앱 빌드
pnpm --filter siljangkim build
pnpm --filter wonjangkim build
```

### 2. 환경 변수 확인
```bash
# 프로덕션 환경 변수 확인
pnpm --filter siljangkim env:check
```

## 문제 해결

### 1. 일반적인 문제
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
rm -rf packages/*/node_modules
pnpm install

# 캐시 정리
pnpm store prune
```

### 2. 데이터베이스 연결 문제
```bash
# PostgreSQL 서비스 상태 확인
brew services list | grep postgresql

# Redis 서비스 상태 확인
brew services list | grep redis
```

### 3. 포트 충돌 해결
```bash
# 포트 사용 중인 프로세스 확인
lsof -i :3000
lsof -i :5432
lsof -i :6379

# 프로세스 종료
kill -9 <PID>
```

## 개발 워크플로우

### 1. 브랜치 전략
```bash
# 기능 브랜치 생성
git checkout -b feature/user-authentication

# 개발 브랜치에서 작업
git checkout -b feature/review-system

# 핫픽스 브랜치
git checkout -b hotfix/critical-bug-fix
```

### 2. 커밋 메시지 규칙
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 변경
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 프로세스 또는 도구 변경
```

### 3. 코드 리뷰 프로세스
1. 기능 개발 완료
2. 테스트 작성 및 실행
3. Pull Request 생성
4. 코드 리뷰 요청
5. 승인 후 메인 브랜치 병합
