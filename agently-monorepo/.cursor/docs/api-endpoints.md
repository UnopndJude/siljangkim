# API 엔드포인트

## 기본 정보

### Base URL
- **개발**: `http://localhost:3000/api`
- **스테이징**: `https://staging-api.agently.com/api`
- **프로덕션**: `https://api.agently.com/api`

### 인증 방식
- **JWT Bearer Token** 사용
- **Header**: `Authorization: Bearer <token>`

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

### 4. 로그아웃
```http
POST /auth/logout
Authorization: Bearer <token>
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
    "tuesday": ["09:00-18:00"]
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

### 4. 의사 정보 수정
```http
PUT /doctors/{doctorId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "introduction": "수정된 자기소개",
  "availableHours": {
    "monday": ["09:00-17:00"]
  }
}
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

### 3. 코디네이터 상세 조회
```http
GET /coordinators/{coordinatorId}
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

### 3. 고급 검색
```http
POST /search/advanced
Authorization: Bearer <token>
Content-Type: application/json

{
  "specialty": ["internal", "surgery"],
  "location": {
    "city": "seoul",
    "district": "gangnam",
    "radius": 10
  },
  "rating": {
    "min": 4.0,
    "max": 5.0
  },
  "experience": {
    "minYears": 5,
    "maxYears": 20
  }
}
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

### 2. 파일 삭제
```http
DELETE /upload/{fileId}
Authorization: Bearer <token>
```

## 알림 API

### 1. 알림 목록 조회
```http
GET /notifications?page=1&limit=10&unreadOnly=true
Authorization: Bearer <token>
```

### 2. 알림 읽음 처리
```http
PUT /notifications/{notificationId}/read
Authorization: Bearer <token>
```

### 3. 알림 설정 조회
```http
GET /notifications/settings
Authorization: Bearer <token>
```

### 4. 알림 설정 수정
```http
PUT /notifications/settings
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": true,
  "push": false,
  "sms": true,
  "types": {
    "review": true,
    "matching": true,
    "system": false
  }
}
```

## 관리자 API

### 1. 사용자 관리
```http
GET /admin/users?page=1&limit=10&role=doctor
Authorization: Bearer <admin_token>

PUT /admin/users/{userId}/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "active|inactive|suspended"
}
```

### 2. 리뷰 관리
```http
GET /admin/reviews?status=pending&page=1&limit=10
Authorization: Bearer <admin_token>

PUT /admin/reviews/{reviewId}/approve
Authorization: Bearer <admin_token>

PUT /admin/reviews/{reviewId}/reject
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "reason": "부적절한 내용"
}
```

### 3. 시스템 통계
```http
GET /admin/statistics
Authorization: Bearer <admin_token>
```

**응답:**
```json
{
  "success": true,
  "data": {
    "users": {
      "total": 1000,
      "doctors": 200,
      "coordinators": 150,
      "patients": 650
    },
    "reviews": {
      "total": 5000,
      "pending": 50,
      "approved": 4900,
      "rejected": 50
    },
    "matchings": {
      "total": 1000,
      "pending": 100,
      "approved": 800,
      "rejected": 100
    }
  }
}
```

