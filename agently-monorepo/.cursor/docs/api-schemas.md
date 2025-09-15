# API 스키마 정의

## 공통 스키마

### 응답 형식
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}
```

### 페이지네이션
```typescript
interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

### 에러 응답
```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
    field?: string; // 필드별 에러인 경우
  };
  meta: {
    timestamp: string;
    requestId: string;
  };
}
```

## 사용자 스키마

### 사용자 기본 정보
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  role: 'doctor' | 'coordinator' | 'patient';
  profileImage?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  role: 'doctor' | 'coordinator' | 'patient';
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
}

interface UpdateUserRequest {
  name?: string;
  phoneNumber?: string;
  profileImage?: string;
}
```

### 로그인/인증
```typescript
interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

interface RefreshTokenRequest {
  refreshToken: string;
}

interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
}
```

## 의사 스키마

### 의사 정보
```typescript
interface Doctor {
  id: string;
  userId: string;
  medicalLicenseNumber: string;
  specialty: MedicalSpecialty;
  yearsOfExperience: number;
  hospitalAffiliation: string;
  introduction: string;
  availableHours: AvailableHours;
  languages: string[];
  education: Education[];
  certifications: Certification[];
  averageRating: number;
  reviewCount: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface MedicalSpecialty {
  code: string;
  name: string;
  category: string;
}

interface AvailableHours {
  [dayOfWeek: string]: string[]; // "monday": ["09:00-18:00"]
}

interface Education {
  degree: string;
  university: string;
  graduationYear: number;
  major?: string;
}

interface Certification {
  name: string;
  issuingOrganization: string;
  issueDate: Date;
  expirationDate?: Date;
}
```

### 의사 등록/수정
```typescript
interface CreateDoctorRequest {
  medicalLicenseNumber: string;
  specialty: string;
  yearsOfExperience: number;
  hospitalAffiliation: string;
  introduction: string;
  availableHours: AvailableHours;
  languages: string[];
  education: Education[];
  certifications: Certification[];
}

interface UpdateDoctorRequest {
  specialty?: string;
  yearsOfExperience?: number;
  hospitalAffiliation?: string;
  introduction?: string;
  availableHours?: AvailableHours;
  languages?: string[];
  education?: Education[];
  certifications?: Certification[];
}
```

## 코디네이터 스키마

### 코디네이터 정보
```typescript
interface Coordinator {
  id: string;
  userId: string;
  specialty: MedicalSpecialty;
  yearsOfExperience: number;
  introduction: string;
  availableHours: AvailableHours;
  languages: string[];
  education: Education[];
  certifications: Certification[];
  networkSize: number;
  averageRating: number;
  reviewCount: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### 코디네이터 등록/수정
```typescript
interface CreateCoordinatorRequest {
  specialty: string;
  yearsOfExperience: number;
  introduction: string;
  availableHours: AvailableHours;
  languages: string[];
  education: Education[];
  certifications: Certification[];
}

interface UpdateCoordinatorRequest {
  specialty?: string;
  yearsOfExperience?: number;
  introduction?: string;
  availableHours?: AvailableHours;
  languages?: string[];
  education?: Education[];
  certifications?: Certification[];
}
```

## 리뷰 스키마

### 리뷰 정보
```typescript
interface Review {
  id: string;
  authorId: string;
  author: User;
  targetId: string;
  targetType: 'doctor' | 'coordinator';
  rating: number;
  content: string;
  categories: ReviewCategories;
  images: string[];
  isAnonymous: boolean;
  visitDate?: Date;
  visitPurpose?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

interface ReviewCategories {
  quality: number; // 진료 품질 (1-5)
  kindness: number; // 친절도 (1-5)
  waitingTime: number; // 대기시간 (1-5)
  facility: number; // 시설 환경 (1-5)
}

interface ReviewStatistics {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    [rating: number]: number;
  };
  categoryAverages: {
    quality: number;
    kindness: number;
    waitingTime: number;
    facility: number;
  };
}
```

### 리뷰 생성/수정
```typescript
interface CreateReviewRequest {
  targetId: string;
  targetType: 'doctor' | 'coordinator';
  rating: number;
  content: string;
  categories: ReviewCategories;
  isAnonymous: boolean;
  images?: string[];
  visitDate?: Date;
  visitPurpose?: string;
}

interface UpdateReviewRequest {
  rating?: number;
  content?: string;
  categories?: Partial<ReviewCategories>;
  images?: string[];
  visitDate?: Date;
  visitPurpose?: string;
}
```

## 매칭 스키마

### 매칭 정보
```typescript
interface Matching {
  id: string;
  coordinatorId: string;
  coordinator: Coordinator;
  doctorId: string;
  doctor: Doctor;
  message: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  responseMessage?: string;
  requestedAt: Date;
  respondedAt?: Date;
  expiresAt: Date;
}

interface CreateMatchingRequest {
  coordinatorId: string;
  doctorId: string;
  message: string;
}

interface UpdateMatchingRequest {
  status: 'approved' | 'rejected';
  responseMessage?: string;
}
```

## 검색 스키마

### 검색 요청
```typescript
interface SearchRequest {
  query?: string;
  type?: 'doctor' | 'coordinator' | 'all';
  filters?: SearchFilters;
  pagination: PaginationParams;
}

interface SearchFilters {
  specialty?: string[];
  location?: LocationFilter;
  rating?: RatingFilter;
  experience?: ExperienceFilter;
  availability?: AvailabilityFilter;
  hospitalAffiliation?: string[];
  languages?: string[];
}

interface LocationFilter {
  city?: string;
  district?: string;
  radius?: number; // km
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface RatingFilter {
  min: number;
  max: number;
}

interface ExperienceFilter {
  minYears: number;
  maxYears: number;
}

interface AvailabilityFilter {
  timeSlots: string[];
  daysOfWeek: number[];
}
```

### 검색 응답
```typescript
interface SearchResponse {
  results: (Doctor | Coordinator)[];
  pagination: PaginationResponse;
  filters: AppliedFilters;
  suggestions?: string[];
}

interface AppliedFilters {
  specialty: string[];
  location: string;
  rating: { min: number; max: number };
  experience: { min: number; max: number };
}
```

## 파일 업로드 스키마

### 파일 정보
```typescript
interface FileUpload {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  type: 'profile' | 'review' | 'certificate';
  uploadedBy: string;
  uploadedAt: Date;
}

interface UploadRequest {
  file: File;
  type: 'profile' | 'review' | 'certificate';
}

interface UploadResponse {
  file: FileUpload;
  uploadUrl?: string; // 직접 업로드용
}
```

## 알림 스키마

### 알림 정보
```typescript
interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: Date;
  readAt?: Date;
}

type NotificationType = 
  | 'review_received'
  | 'review_approved'
  | 'review_rejected'
  | 'matching_request'
  | 'matching_approved'
  | 'matching_rejected'
  | 'system_maintenance'
  | 'policy_update';

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  types: {
    [key in NotificationType]: boolean;
  };
}
```

## 관리자 스키마

### 관리자 기능
```typescript
interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  permissions: string[];
  lastLoginAt?: Date;
  createdAt: Date;
}

interface SystemStatistics {
  users: {
    total: number;
    doctors: number;
    coordinators: number;
    patients: number;
    active: number;
    inactive: number;
  };
  reviews: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    thisMonth: number;
  };
  matchings: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    thisMonth: number;
  };
  system: {
    uptime: number;
    averageResponseTime: number;
    errorRate: number;
    activeConnections: number;
  };
}
```

## 유효성 검사 스키마

### 검증 규칙
```typescript
interface ValidationRules {
  email: {
    required: true;
    pattern: RegExp;
    maxLength: 255;
  };
  password: {
    required: true;
    minLength: 8;
    maxLength: 128;
    pattern: RegExp;
  };
  name: {
    required: true;
    minLength: 2;
    maxLength: 50;
    pattern: RegExp;
  };
  phoneNumber: {
    required: true;
    pattern: RegExp;
  };
  medicalLicenseNumber: {
    required: true;
    pattern: RegExp;
  };
  reviewContent: {
    required: true;
    minLength: 10;
    maxLength: 500;
  };
  rating: {
    required: true;
    min: 1;
    max: 5;
  };
}
```

### 에러 코드
```typescript
enum ErrorCodes {
  // 인증 관련
  UNAUTHORIZED = 'AUTH_001',
  TOKEN_EXPIRED = 'AUTH_002',
  INVALID_CREDENTIALS = 'AUTH_003',
  
  // 권한 관련
  INSUFFICIENT_PERMISSIONS = 'PERM_001',
  ROLE_MISMATCH = 'PERM_002',
  
  // 데이터 관련
  VALIDATION_ERROR = 'DATA_001',
  DUPLICATE_ENTRY = 'DATA_002',
  NOT_FOUND = 'DATA_003',
  
  // 비즈니스 로직 관련
  REVIEW_NOT_ALLOWED = 'BIZ_001',
  MATCHING_NOT_AVAILABLE = 'BIZ_002',
  INVALID_MEDICAL_LICENSE = 'BIZ_003'
}
```

