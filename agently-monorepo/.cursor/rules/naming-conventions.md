# 네이밍 컨벤션

## 파일명 규칙

### 컴포넌트 파일
```typescript
// PascalCase 사용
UserCard.tsx
ReviewItem.tsx
SearchBar.tsx
CoordinatorCard.tsx
DoctorProfile.tsx
```

### 유틸리티 파일
```typescript
// camelCase 사용
formatDate.ts
validateEmail.ts
apiClient.ts
dateUtils.ts
stringHelpers.ts
```

### 상수 파일
```typescript
// UPPER_SNAKE_CASE 사용
API_ENDPOINTS.ts
ERROR_MESSAGES.ts
VALIDATION_RULES.ts
USER_ROLES.ts
```

### 타입 정의 파일
```typescript
// camelCase + .types.ts 접미사
user.types.ts
review.types.ts
api.types.ts
common.types.ts
```

### Mapper 파일
```typescript
// Supabase{FeatureName}Mapper.ts 패턴
SupabaseUserMapper.ts
SupabaseReviewMapper.ts
SupabaseDoctorMapper.ts
```

### Mapper 함수
```typescript
// map{Row}To{Model} 패턴
mapUserRowToUser
mapReviewRowToReview
mapDoctorRowToDoctor
```

## 폴더명 규칙

### Feature 폴더
```typescript
// kebab-case 사용
user-management/
review-system/
api-clients/
ui-components/
business-logic/
```

### Next.js 특수 폴더
```typescript
// camelCase 사용 (Next.js 컨벤션)
app/
api/
components/
lib/
hooks/
```

## 변수명 규칙

### 일반 변수
```typescript
// camelCase 사용
const userName = 'john_doe';
const userAge = 30;
const isUserAuthenticated = true;
const userEmailAddress = 'user@example.com';
const reviewCount = 10;
const averageRating = 4.5;
```

### 상수
```typescript
// UPPER_SNAKE_CASE 사용
const MAX_REVIEW_LENGTH = 500;
const DEFAULT_PAGE_SIZE = 10;
const API_BASE_URL = 'https://api.example.com';
const SUPPORTED_IMAGE_TYPES = ['jpg', 'png', 'gif'];
const USER_ROLES = ['admin', 'user', 'moderator'];
```

### 배열과 객체
```typescript
// 복수형 사용
const users = [];
const reviews = [];
const doctors = [];
const coordinators = [];

// 객체는 단수형
const user = {};
const review = {};
const doctor = {};
const coordinator = {};
```

## 함수명 규칙

### 일반 함수
```typescript
// camelCase, 동사로 시작
const getUserById = (id: string) => { /* ... */ };
const validateEmailFormat = (email: string) => { /* ... */ };
const calculateReviewAverage = (reviews: Review[]) => { /* ... */ };
const sendWelcomeEmail = (user: User) => { /* ... */ };
const formatDate = (date: Date) => { /* ... */ };
```

### 이벤트 핸들러
```typescript
// handle 접두사 사용
const handleSubmit = (event: FormEvent) => { /* ... */ };
const handleUserLogin = (userData: LoginData) => { /* ... */ };
const handleReviewCreate = (reviewData: CreateReviewData) => { /* ... */ };
const handleEmailChange = (email: string) => { /* ... */ };
const handleButtonClick = () => { /* ... */ };
```

### DOM 이벤트 핸들러
```typescript
// on 접두사 사용
const onClick = () => { /* ... */ };
const onChange = (event: ChangeEvent) => { /* ... */ };
const onFocus = () => { /* ... */ };
const onBlur = () => { /* ... */ };
const onKeyDown = (event: KeyboardEvent) => { /* ... */ };
```

### 비동기 함수
```typescript
// async 접두사 또는 동사 사용
const fetchUserData = async (id: string) => { /* ... */ };
const loadUserProfile = async (userId: string) => { /* ... */ };
const saveUserData = async (user: User) => { /* ... */ };
const deleteUserAccount = async (userId: string) => { /* ... */ };
```

## 클래스명 규칙

### 일반 클래스
```typescript
// PascalCase 사용
class UserService { /* ... */ }
class ReviewValidator { /* ... */ }
class EmailNotificationService { /* ... */ }
class DatabaseConnection { /* ... */ }
class ApiClient { /* ... */ }
```

### 추상 클래스
```typescript
// Abstract 접두사 사용
abstract class AbstractRepository<T> { /* ... */ }
abstract class AbstractService { /* ... */ }
abstract class AbstractValidator { /* ... */ }
```

### 인터페이스
```typescript
// I 접두사 사용
interface IUserRepository { /* ... */ }
interface IEmailService { /* ... */ }
interface IReviewValidator { /* ... */ }
interface IApiResponse<T> { /* ... */ }
```

### 타입 별칭
```typescript
// PascalCase 사용
type UserRole = 'admin' | 'user' | 'moderator';
type ReviewStatus = 'pending' | 'approved' | 'rejected';
type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};
```

## API 관련 네이밍

### 엔드포인트
```typescript
// kebab-case 사용
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
```typescript
// HTTP 메서드 + PascalCase 사용
const getUserById = (id: string) => { /* ... */ };
const createUser = (userData: CreateUserData) => { /* ... */ };
const updateUser = (id: string, userData: UpdateUserData) => { /* ... */ };
const deleteUser = (id: string) => { /* ... */ };
const patchUser = (id: string, userData: Partial<UserData>) => { /* ... */ };
```

### API 응답 타입
```typescript
// Response 접미사 사용
interface UserResponse {
  id: string;
  name: string;
  email: string;
}

interface CreateUserResponse {
  user: UserResponse;
  token: string;
}

interface ApiErrorResponse {
  code: string;
  message: string;
  details?: any;
}
```

## 데이터베이스 관련 네이밍

### 테이블명
```sql
-- snake_case 사용 (복수형)
users
reviews
coordinators
doctors
user_reviews
coordinator_doctors
```

### 컬럼명
```sql
-- snake_case 사용
user_id
email_address
created_at
updated_at
is_active
review_count
medical_license_number
```

### 인덱스명
```sql
-- idx_ 접두사 + snake_case 사용
idx_users_email
idx_reviews_user_id
idx_reviews_created_at
idx_coordinators_specialty
idx_doctors_medical_license
```

### 제약조건명
```sql
-- fk_, pk_, uk_ 접두사 사용
pk_users
fk_reviews_user_id
uk_users_email
ck_users_age_positive
```

## CSS 클래스명 규칙

### BEM 방법론
```css
/* Block__Element--Modifier 형식 */
.user-card { /* ... */ }
.user-card__header { /* ... */ }
.user-card__content { /* ... */ }
.user-card__footer { /* ... */ }
.user-card--featured { /* ... */ }
.user-card--compact { /* ... */ }

.review-item { /* ... */ }
.review-item__rating { /* ... */ }
.review-item__content { /* ... */ }
.review-item--approved { /* ... */ }
.review-item--pending { /* ... */ }
```

### Tailwind CSS 클래스
```typescript
// 공식 Tailwind 클래스명 사용
const buttonClasses = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
const cardClasses = 'bg-white shadow-md rounded-lg p-6';
const inputClasses = 'border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500';

// 커스텀 클래스는 kebab-case 사용
const customButtonClasses = 'custom-primary-button custom-large-size';
```

## 환경 변수 네이밍

### 환경 변수
```typescript
// UPPER_SNAKE_CASE 사용
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const API_BASE_URL = process.env.API_BASE_URL;
const REDIS_URL = process.env.REDIS_URL;
const EMAIL_SERVICE_API_KEY = process.env.EMAIL_SERVICE_API_KEY;
```

### 설정 객체
```typescript
// camelCase 사용
const config = {
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  apiBaseUrl: process.env.API_BASE_URL,
  redisUrl: process.env.REDIS_URL,
  emailServiceApiKey: process.env.EMAIL_SERVICE_API_KEY
};
```

## 테스트 관련 네이밍

### 테스트 파일명
```typescript
// .test.ts 또는 .spec.ts 접미사
user.test.ts
review.service.test.ts
email.validator.spec.ts
api.client.test.ts
```

### 테스트 함수명
```typescript
// describe: 명사, it: 동사로 시작
describe('UserService', () => {
  it('should create user with valid data', () => { /* ... */ });
  it('should throw error with invalid email', () => { /* ... */ });
  it('should update user successfully', () => { /* ... */ });
});

describe('ReviewValidator', () => {
  it('should validate review content', () => { /* ... */ });
  it('should reject reviews with profanity', () => { /* ... */ });
});
```

### 테스트 데이터
```typescript
// MOCK_ 접두사 사용
const MOCK_USER_DATA = {
  id: 'user_123',
  name: '테스트 사용자',
  email: 'test@example.com'
};

const MOCK_REVIEW_DATA = {
  id: 'review_456',
  rating: 5,
  content: '테스트 리뷰 내용'
};
```

## 에러 관련 네이밍

### 에러 클래스
```typescript
// Error 접미사 사용
class ValidationError extends Error { /* ... */ }
class AuthenticationError extends Error { /* ... */ }
class AuthorizationError extends Error { /* ... */ }
class NotFoundError extends Error { /* ... */ }
class ConflictError extends Error { /* ... */ }
```

### 에러 코드
```typescript
// UPPER_SNAKE_CASE 사용
const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_FAILED: 'AUTHENTICATION_FAILED',
  AUTHORIZATION_DENIED: 'AUTHORIZATION_DENIED',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS'
};
```

## 유틸리티 함수 네이밍

### 검증 함수
```typescript
// is 접두사 사용
const isValidEmail = (email: string): boolean => { /* ... */ };
const isStrongPassword = (password: string): boolean => { /* ... */ };
const isPositiveNumber = (num: number): boolean => { /* ... */ };
const isEmpty = (value: any): boolean => { /* ... */ };
```

### 변환 함수
```typescript
// to 접두사 사용
const toUpperCase = (str: string): string => { /* ... */ };
const toLowerCase = (str: string): string => { /* ... */ };
const toDate = (dateString: string): Date => { /* ... */ };
const toNumber = (value: string): number => { /* ... */ };
```

### 포맷팅 함수
```typescript
// format 접두사 사용
const formatDate = (date: Date): string => { /* ... */ };
const formatCurrency = (amount: number): string => { /* ... */ };
const formatPhoneNumber = (phone: string): string => { /* ... */ };
const formatFileSize = (bytes: number): string => { /* ... */ };
```

## Repository 메서드 네이밍

### CRUD 기반 동사
```typescript
// Repository 인터페이스
interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(data: CreateUserData): Promise<User>;
  update(id: string, data: UpdateUserData): Promise<User>;
  delete(id: string): Promise<void>;
}
```

### Application Service 메서드
```typescript
// 비즈니스 맥락을 설명하는 서술적인 동사
class UserService {
  getUserProfile(userId: string): Promise<UserProfile>;
  updateUserProfile(userId: string, data: UpdateUserData): Promise<UserProfile>;
  deleteUserAccount(userId: string): Promise<void>;
  searchUsers(criteria: SearchCriteria): Promise<User[]>;
}
```

