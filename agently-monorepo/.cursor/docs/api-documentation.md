# API 문서 (API Documentation)

## API 개요

### 기본 정보
- **Base URL**: `https://api.agently.com/v1`
- **인증 방식**: JWT Bearer Token
- **응답 형식**: JSON
- **문자 인코딩**: UTF-8

### 공통 응답 형식
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

## 인증 API

### 1. 사용자 등록
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123!",
  "name": "홍길동",
  "role": "patient",
  "phoneNumber": "010-1234-5678"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "홍길동",
      "role": "patient",
      "createdAt": "2024-01-01T00:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here"
  }
}
```

### 2. 사용자 로그인
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123!"
}
```

### 3. 토큰 갱신
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token_here"
}
```

## 사용자 API

### 1. 사용자 프로필 조회
```http
GET /users/profile
Authorization: Bearer <token>
```

### 2. 사용자 프로필 수정
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "홍길동",
  "phoneNumber": "010-1234-5678",
  "profileImage": "https://example.com/image.jpg"
}
```

### 3. 사용자 목록 조회
```http
GET /users?page=1&limit=10&role=doctor&specialty=internal
Authorization: Bearer <token>
```

## 의사 API

### 1. 의사 등록
```http
POST /doctors
Authorization: Bearer <token>
Content-Type: application/json

{
  "medicalLicenseNumber": "MD123456",
  "specialty": "internal",
  "yearsOfExperience": 10,
  "hospitalAffiliation": "서울대학교병원",
  "introduction": "내과 전문의입니다.",
  "availableHours": {
    "monday": ["09:00-18:00"],
    "tuesday": ["09:00-18:00"],
    "wednesday": ["09:00-18:00"],
    "thursday": ["09:00-18:00"],
    "friday": ["09:00-18:00"]
  }
}
```

### 2. 의사 목록 조회
```http
GET /doctors?specialty=internal&location=seoul&rating=4.0&page=1&limit=10
Authorization: Bearer <token>
```

**응답:**
```json
{
  "success": true,
  "data": {
    "doctors": [
      {
        "id": "doctor_123",
        "name": "김의사",
        "specialty": "internal",
        "yearsOfExperience": 10,
        "hospitalAffiliation": "서울대학교병원",
        "averageRating": 4.5,
        "reviewCount": 25,
        "profileImage": "https://example.com/doctor.jpg"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

### 3. 의사 상세 조회
```http
GET /doctors/{doctorId}
Authorization: Bearer <token>
```

## 코디네이터 API

### 1. 코디네이터 등록
```http
POST /coordinators
Authorization: Bearer <token>
Content-Type: application/json

{
  "specialty": "internal",
  "yearsOfExperience": 5,
  "introduction": "내과 코디네이터입니다.",
  "availableHours": {
    "monday": ["09:00-18:00"],
    "tuesday": ["09:00-18:00"]
  }
}
```

### 2. 코디네이터 목록 조회
```http
GET /coordinators?specialty=internal&page=1&limit=10
Authorization: Bearer <token>
```

## 리뷰 API

### 1. 리뷰 작성
```http
POST /reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "targetId": "doctor_123",
  "targetType": "doctor",
  "rating": 5,
  "content": "정말 친절하고 전문적인 의사입니다.",
  "categories": {
    "quality": 5,
    "kindness": 5,
    "waitingTime": 4
  },
  "isAnonymous": false,
  "images": ["https://example.com/review1.jpg"]
}
```

### 2. 리뷰 목록 조회
```http
GET /reviews?targetId=doctor_123&targetType=doctor&page=1&limit=10
Authorization: Bearer <token>
```

**응답:**
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "review_123",
        "author": {
          "id": "user_456",
          "name": "김환자",
          "profileImage": "https://example.com/user.jpg"
        },
        "rating": 5,
        "content": "정말 친절하고 전문적인 의사입니다.",
        "categories": {
          "quality": 5,
          "kindness": 5,
          "waitingTime": 4
        },
        "images": ["https://example.com/review1.jpg"],
        "createdAt": "2024-01-01T00:00:00Z",
        "isAnonymous": false
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    },
    "statistics": {
      "averageRating": 4.5,
      "totalReviews": 25,
      "ratingDistribution": {
        "5": 15,
        "4": 7,
        "3": 2,
        "2": 1,
        "1": 0
      }
    }
  }
}
```

### 3. 리뷰 수정
```http
PUT /reviews/{reviewId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 4,
  "content": "수정된 리뷰 내용입니다.",
  "categories": {
    "quality": 4,
    "kindness": 5,
    "waitingTime": 3
  }
}
```

### 4. 리뷰 삭제
```http
DELETE /reviews/{reviewId}
Authorization: Bearer <token>
```

## 매칭 API

### 1. 코디네이터-의사 매칭 요청
```http
POST /matchings
Authorization: Bearer <token>
Content-Type: application/json

{
  "coordinatorId": "coordinator_123",
  "doctorId": "doctor_456",
  "message": "함께 협력하고 싶습니다."
}
```

### 2. 매칭 요청 목록 조회
```http
GET /matchings?status=pending&page=1&limit=10
Authorization: Bearer <token>
```

### 3. 매칭 요청 승인/거부
```http
PUT /matchings/{matchingId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "approved",
  "message": "매칭을 승인합니다."
}
```

## 검색 API

### 1. 통합 검색
```http
GET /search?q=내과&type=doctor&location=seoul&page=1&limit=10
Authorization: Bearer <token>
```

### 2. 자동완성 검색
```http
GET /search/suggestions?q=내과&type=doctor
Authorization: Bearer <token>
```

## 파일 업로드 API

### 1. 이미지 업로드
```http
POST /upload/image
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <image_file>
type: profile|review
```

**응답:**
```json
{
  "success": true,
  "data": {
    "url": "https://cdn.agently.com/images/uploaded_image_123.jpg",
    "filename": "profile_image.jpg",
    "size": 1024000,
    "mimeType": "image/jpeg"
  }
}
```

## 에러 코드

### 인증 관련 에러
- `AUTH_001`: 인증 토큰이 없습니다
- `AUTH_002`: 토큰이 만료되었습니다
- `AUTH_003`: 유효하지 않은 토큰입니다
- `AUTH_004`: 권한이 없습니다

### 데이터 관련 에러
- `DATA_001`: 필수 필드가 누락되었습니다
- `DATA_002`: 중복된 데이터입니다
- `DATA_003`: 데이터를 찾을 수 없습니다
- `DATA_004`: 유효하지 않은 데이터 형식입니다

### 비즈니스 로직 에러
- `BIZ_001`: 리뷰 작성 권한이 없습니다
- `BIZ_002`: 매칭이 불가능합니다
- `BIZ_003`: 유효하지 않은 의료 라이선스입니다
- `BIZ_004`: 리뷰 수정 권한이 없습니다

## Rate Limiting

### 제한 사항
- **일반 API**: 1000 requests/hour per IP
- **인증 API**: 10 requests/hour per IP
- **파일 업로드**: 50 requests/hour per user
- **리뷰 작성**: 10 requests/day per user

### 응답 헤더
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## 웹훅 (Webhooks)

### 1. 리뷰 작성 알림
```http
POST /webhooks/review-created
Content-Type: application/json
X-Webhook-Signature: <signature>

{
  "event": "review.created",
  "data": {
    "reviewId": "review_123",
    "targetId": "doctor_456",
    "targetType": "doctor",
    "rating": 5,
    "authorId": "user_789"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 2. 매칭 상태 변경 알림
```http
POST /webhooks/matching-status-changed
Content-Type: application/json
X-Webhook-Signature: <signature>

{
  "event": "matching.status_changed",
  "data": {
    "matchingId": "matching_123",
    "status": "approved",
    "coordinatorId": "coordinator_456",
    "doctorId": "doctor_789"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## SDK 및 예제

### JavaScript/TypeScript SDK
```typescript
import { AgentlyClient } from '@agently/sdk';

const client = new AgentlyClient({
  apiKey: 'your_api_key',
  baseUrl: 'https://api.agently.com/v1'
});

// 사용자 등록
const user = await client.auth.register({
  email: 'user@example.com',
  password: 'password123!',
  name: '홍길동',
  role: 'patient'
});

// 의사 목록 조회
const doctors = await client.doctors.list({
  specialty: 'internal',
  location: 'seoul',
  page: 1,
  limit: 10
});
```

### cURL 예제
```bash
# 사용자 등록
curl -X POST https://api.agently.com/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123!",
    "name": "홍길동",
    "role": "patient"
  }'

# 의사 목록 조회
curl -X GET "https://api.agently.com/v1/doctors?specialty=internal&page=1&limit=10" \
  -H "Authorization: Bearer your_token_here"
```
