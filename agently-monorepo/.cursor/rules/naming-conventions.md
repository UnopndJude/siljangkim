# 네이밍 컨벤션 (Naming Conventions)

## 파일명 규칙

### 컴포넌트 파일
- **PascalCase** 사용
- 파일명과 컴포넌트명 일치
- 확장자: `.tsx` (React 컴포넌트), `.ts` (유틸리티)

```
components/
├── UserCard.tsx          # UserCard 컴포넌트
├── ReviewItem.tsx        # ReviewItem 컴포넌트
├── SearchBar.tsx         # SearchBar 컴포넌트
└── CoordinatorCard.tsx   # CoordinatorCard 컴포넌트
```

### 유틸리티 파일
- **camelCase** 사용
- 기능을 명확히 표현하는 이름

```
lib/
├── utils.ts              # 유틸리티 함수들
├── formatDate.ts         # 날짜 포맷팅
├── validateEmail.ts      # 이메일 검증
└── apiClient.ts          # API 클라이언트
```

### 상수 파일
- **UPPER_SNAKE_CASE** 사용
- 의미를 명확히 표현

```
constants/
├── API_ENDPOINTS.ts      # API 엔드포인트
├── ERROR_MESSAGES.ts     # 에러 메시지
└── VALIDATION_RULES.ts   # 검증 규칙
```

## 폴더명 규칙

### 일반 폴더
- **kebab-case** 사용 (소문자, 하이픈 구분)

```
src/
├── components/
├── pages/
├── hooks/
├── services/
└── types/
```

### 특수 폴더
- **camelCase** 사용 (Next.js 컨벤션)

```
src/
├── app/                  # Next.js App Router
├── api/                  # API 라우트
└── middleware/           # 미들웨어
```

## 변수명 규칙

### 일반 변수
- **camelCase** 사용
- 의미있는 이름 사용
- 약어 사용 금지

```typescript
// 좋은 예
const userName = 'john_doe';
const isUserAuthenticated = true;
const userEmailAddress = 'user@example.com';
const reviewCount = 10;

// 나쁜 예
const un = 'john_doe';
const isAuth = true;
const uEmail = 'user@example.com';
const rCnt = 10;
```

### 상수
- **UPPER_SNAKE_CASE** 사용

```typescript
const MAX_REVIEW_LENGTH = 500;
const DEFAULT_PAGE_SIZE = 10;
const API_BASE_URL = 'https://api.example.com';
const SUPPORTED_IMAGE_TYPES = ['jpg', 'png', 'gif'];
```

### 함수명
- **camelCase** 사용
- 동사로 시작
- 동작을 명확히 표현

```typescript
// 좋은 예
const getUserById = (id: string) => { /* ... */ };
const validateEmailFormat = (email: string) => { /* ... */ };
const calculateReviewAverage = (reviews: Review[]) => { /* ... */ };
const sendWelcomeEmail = (user: User) => { /* ... */ };

// 나쁜 예
const get = (id: string) => { /* ... */ };
const check = (email: string) => { /* ... */ };
const calc = (reviews: Review[]) => { /* ... */ };
const send = (user: User) => { /* ... */ };
```

### 클래스명
- **PascalCase** 사용
- 명사로 시작

```typescript
class UserService { /* ... */ }
class ReviewValidator { /* ... */ }
class EmailNotificationService { /* ... */ }
class DatabaseConnection { /* ... */ }
```

## 인터페이스명 규칙

### 인터페이스
- **I** 접두사 + **PascalCase** 사용

```typescript
interface IUserRepository { /* ... */ }
interface IEmailService { /* ... */ }
interface IReviewValidator { /* ... */ }
interface IApiResponse<T> { /* ... */ }
```

### 타입 별칭
- **PascalCase** 사용

```typescript
type UserRole = 'admin' | 'user' | 'moderator';
type ReviewStatus = 'pending' | 'approved' | 'rejected';
type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};
```

## 이벤트 핸들러명 규칙

### React 이벤트 핸들러
- **handle** 접두사 + **camelCase** 사용

```typescript
const handleSubmit = (event: FormEvent) => { /* ... */ };
const handleUserLogin = (userData: LoginData) => { /* ... */ };
const handleReviewCreate = (reviewData: CreateReviewData) => { /* ... */ };
const handleEmailChange = (email: string) => { /* ... */ };
```

### DOM 이벤트 핸들러
- **on** 접두사 + **camelCase** 사용

```typescript
const onClick = () => { /* ... */ };
const onChange = (event: ChangeEvent) => { /* ... */ };
const onFocus = () => { /* ... */ };
const onBlur = () => { /* ... */ };
```

## API 관련 네이밍

### 엔드포인트
- **kebab-case** 사용
- RESTful 컨벤션 준수

```typescript
const API_ENDPOINTS = {
  USERS: '/api/users',
  USER_BY_ID: '/api/users/:id',
  USER_REVIEWS: '/api/users/:id/reviews',
  REVIEWS: '/api/reviews',
  REVIEW_BY_ID: '/api/reviews/:id',
  COORDINATORS: '/api/coordinators',
  DOCTORS: '/api/doctors'
};
```

### HTTP 메서드 함수
- HTTP 메서드 + **PascalCase** 사용

```typescript
const getUserById = (id: string) => { /* ... */ };
const createUser = (userData: CreateUserData) => { /* ... */ };
const updateUser = (id: string, userData: UpdateUserData) => { /* ... */ };
const deleteUser = (id: string) => { /* ... */ };
```

## 데이터베이스 관련 네이밍

### 테이블명
- **snake_case** 사용 (복수형)

```sql
users
reviews
coordinators
doctors
user_reviews
coordinator_doctors
```

### 컬럼명
- **snake_case** 사용

```sql
user_id
email_address
created_at
updated_at
is_active
review_count
```

### 인덱스명
- **idx_** 접두사 + **snake_case** 사용

```sql
idx_users_email
idx_reviews_user_id
idx_reviews_created_at
idx_coordinators_specialty
```

## CSS 클래스명 규칙

### BEM 방법론 사용
- **Block__Element--Modifier** 형식

```css
/* Block */
.user-card { /* ... */ }
.review-item { /* ... */ }
.search-bar { /* ... */ }

/* Element */
.user-card__header { /* ... */ }
.user-card__content { /* ... */ }
.user-card__footer { /* ... */ }

/* Modifier */
.user-card--featured { /* ... */ }
.user-card--compact { /* ... */ }
.review-item--approved { /* ... */ }
.review-item--pending { /* ... */ }
```

### Tailwind CSS 클래스
- 공식 Tailwind 클래스명 사용
- 커스텀 클래스는 **kebab-case** 사용

```typescript
const buttonClasses = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
const cardClasses = 'bg-white shadow-md rounded-lg p-6';
const customButtonClasses = 'custom-primary-button custom-large-size';
```
