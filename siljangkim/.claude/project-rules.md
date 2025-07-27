# 프로젝트 규칙 및 컨벤션

이 문서는 Claude가 자동으로 인지하고 따라야 할 프로젝트 규칙을 정의합니다.

## 코드 컨벤션

### TypeScript
- strict mode 사용
- 명시적 타입 선언 권장
- any 타입 사용 금지
- 인터페이스는 I 접두사 사용 (예: IUserRepository)

### 네이밍 규칙
- 파일명: kebab-case
- 컴포넌트: PascalCase
- 함수/변수: camelCase
- 상수: UPPER_SNAKE_CASE
- 타입/인터페이스: PascalCase

### Import 순서
1. React/Next.js imports
2. Third-party libraries
3. 절대 경로 imports (@/)
4. 상대 경로 imports
5. 타입 imports

## DDD 아키텍처 규칙

### 레이어 의존성
- Domain → 없음 (독립적)
- Application → Domain
- Infrastructure → Domain, Application
- Presentation → Application, Domain

### 엔티티 규칙
- 모든 엔티티는 ID를 가져야 함
- 생성은 static create 메서드 사용
- 비즈니스 로직은 엔티티 내부에 구현

### 값 객체 규칙
- 불변성 유지 (readonly)
- 유효성 검증은 생성자에서
- equals 메서드 구현 필수

## API 규칙

### 응답 형식
```typescript
{
  success: boolean,
  data?: any,
  error?: string,
  meta?: {
    total: number,
    limit: number,
    offset: number
  }
}
```

### HTTP 상태 코드
- 200: 성공
- 201: 생성 성공
- 400: 잘못된 요청
- 401: 인증 필요
- 403: 권한 없음
- 404: 리소스 없음
- 500: 서버 오류

## 데이터베이스 규칙

### 명명 규칙
- 테이블명: PascalCase
- 컬럼명: camelCase
- 인덱스명: idx_테이블명_컬럼명

### 필수 컬럼
- id: 모든 테이블
- createdAt: 생성 시간
- updatedAt: 수정 시간

## Git 커밋 규칙

### 커밋 메시지 형식
```
type(scope): subject

body

footer
```

### Type
- feat: 새로운 기능
- fix: 버그 수정
- docs: 문서 수정
- style: 코드 포맷팅
- refactor: 코드 리팩토링
- test: 테스트 추가
- chore: 빌드 업무 수정

## 보안 규칙

### 필수 검증
- 모든 사용자 입력은 서버에서 검증
- SQL Injection 방지 (Prisma 사용)
- XSS 방지 (React 자동 이스케이핑)

### 인증/권한
- 보호된 라우트는 미들웨어로 검증
- API는 세션 또는 JWT 토큰 확인
- 권한 검증은 Use Case 레벨에서

## UI/UX 규칙

### 컴포넌트 구조
- 재사용 가능한 컴포넌트는 /components/ui에 위치
- 페이지별 컴포넌트는 해당 페이지 폴더에 위치

### 스타일링
- Tailwind CSS 사용
- 커스텀 색상은 tailwind.config.js에 정의
- 반응형 디자인 필수

## 테스트 규칙

### 테스트 파일 위치
- 유닛 테스트: 동일 폴더에 .test.ts
- 통합 테스트: __tests__ 폴더

### 테스트 커버리지
- 도메인 로직: 100%
- Use Cases: 90% 이상
- API Routes: 80% 이상