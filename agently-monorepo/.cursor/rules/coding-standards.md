# 코딩 표준 (Coding Standards)

## TypeScript 규칙

### 타입 정의
- 모든 함수와 변수에 명시적 타입 정의
- `any` 타입 사용 금지
- 인터페이스는 `I` 접두사 사용 (예: `IUserRepository`)
- 엔티티는 PascalCase 사용 (예: `User`, `Review`)

### 함수 작성
```typescript
// 좋은 예
const createUser = async (userData: CreateUserRequest): Promise<User> => {
  // 구현
};

// 나쁜 예
const createUser = async (userData) => {
  // 구현
};
```

## React/Next.js 규칙

### 컴포넌트 구조
- 함수형 컴포넌트 사용
- Props 인터페이스 정의
- 컴포넌트명은 PascalCase

```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary' }) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### 파일 구조
- 컴포넌트는 `components/` 폴더에 위치
- 각 컴포넌트는 별도 파일로 분리
- `index.ts`를 통한 export 관리

## 네이밍 규칙

### 파일명
- 컴포넌트: PascalCase (예: `UserCard.tsx`)
- 유틸리티: camelCase (예: `formatDate.ts`)
- 상수: UPPER_SNAKE_CASE (예: `API_ENDPOINTS.ts`)

### 변수명
- camelCase 사용
- 의미있는 이름 사용
- 약어 사용 금지

```typescript
// 좋은 예
const userEmail = 'user@example.com';
const isUserAuthenticated = true;

// 나쁜 예
const uEmail = 'user@example.com';
const isAuth = true;
```

## 에러 처리

### 예외 처리
```typescript
try {
  const result = await someAsyncOperation();
  return result;
} catch (error) {
  console.error('Operation failed:', error);
  throw new Error('사용자 친화적인 에러 메시지');
}
```

### API 응답
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

## 주석 규칙

### JSDoc 사용
```typescript
/**
 * 사용자 리뷰를 생성합니다.
 * @param reviewData - 리뷰 생성에 필요한 데이터
 * @param userId - 리뷰 작성자 ID
 * @returns 생성된 리뷰 객체
 * @throws {ValidationError} 입력 데이터가 유효하지 않은 경우
 */
const createReview = async (reviewData: CreateReviewRequest, userId: string): Promise<Review> => {
  // 구현
};
```

### TODO 주석
```typescript
// TODO: 에러 처리 로직 개선 필요
// FIXME: 메모리 누수 가능성 있음
// NOTE: 이 함수는 외부 API 호출을 포함합니다
```
