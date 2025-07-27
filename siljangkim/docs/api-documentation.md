# 김실장넷 API 문서

## 개요

김실장넷 API는 RESTful 원칙을 따르며, 모든 응답은 JSON 형식으로 제공됩니다.

## 인증

API 인증은 NextAuth.js 세션 또는 JWT 토큰을 통해 이루어집니다.

### 인증 헤더
```
Authorization: Bearer {token}
```

또는 쿠키:
```
auth-token={token}
```

## API 엔드포인트

### 1. 인증 (Authentication)

#### 1.1 회원가입
```
POST /api/auth/register
```

**요청 본문:**
```json
{
  "email": "user@hospital.com",
  "password": "password123",
  "name": "김철수",
  "hospitalName": "서울대병원",
  "verificationType": "medical",
  "medicalLicenseNumber": "12345",
  "businessNumber": null,
  "verificationDocuments": []
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@hospital.com",
    "name": "김철수",
    "hospitalName": "서울대병원",
    "verificationStatus": "PENDING",
    "isVerified": false
  }
}
```

#### 1.2 로그인
```
POST /api/auth/login
```

**요청 본문:**
```json
{
  "email": "user@hospital.com",
  "password": "password123"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@hospital.com",
      "name": "김철수",
      "hospitalName": "서울대병원",
      "role": "HOSPITAL_STAFF",
      "verificationStatus": "VERIFIED",
      "isVerified": true
    },
    "token": "jwt-token"
  }
}
```

### 2. 평가 (Reviews)

#### 2.1 평가 작성
```
POST /api/reviews
```

**요청 본문:**
```json
{
  "coordinatorId": "coordinator-uuid",
  "ratings": {
    "professionalism": 5,
    "communication": 4,
    "responsibility": 5,
    "cooperation": 4,
    "kindness": 5
  },
  "workYear": 2024,
  "workDuration": "1년 6개월",
  "title": "전문적이고 책임감 있는 실장님",
  "content": "업무 처리가 매우 빠르고 정확합니다. 환자 응대도 친절하고 전문적입니다.",
  "isAnonymous": true
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": "review-uuid",
    "coordinatorId": "coordinator-uuid",
    "authorId": "anonymous",
    "ratings": {
      "professionalism": 5,
      "communication": 4,
      "responsibility": 5,
      "cooperation": 4,
      "kindness": 5
    },
    "averageRating": 4.6,
    "createdAt": "2024-01-27T12:00:00Z"
  }
}
```

#### 2.2 평가 목록 조회
```
GET /api/reviews?coordinatorId={id}&limit=20&offset=0
```

**쿼리 파라미터:**
- `coordinatorId` (선택): 특정 코디네이터의 평가만 조회
- `minRating` (선택): 최소 평점
- `maxRating` (선택): 최대 평점
- `limit` (선택, 기본값: 20): 조회할 개수
- `offset` (선택, 기본값: 0): 시작 위치

**응답:**
```json
{
  "success": true,
  "data": [
    {
      "id": "review-uuid",
      "coordinatorId": "coordinator-uuid",
      "coordinatorName": "김실장",
      "hospitalName": "서울대병원",
      "ratings": {
        "professionalism": 5,
        "communication": 4,
        "responsibility": 5,
        "cooperation": 4,
        "kindness": 5
      },
      "title": "전문적이고 책임감 있는 실장님",
      "content": "업무 처리가 매우 빠르고 정확합니다.",
      "authorId": "anonymous",
      "createdAt": "2024-01-27T12:00:00Z"
    }
  ],
  "meta": {
    "total": 50,
    "limit": 20,
    "offset": 0
  }
}
```

### 3. 코디네이터 (Coordinators)

#### 3.1 코디네이터 검색
```
GET /api/coordinators/search?name={name}&hospital={hospital}
```

**쿼리 파라미터:**
- `name` (선택): 이름으로 검색
- `hospital` (선택): 병원명으로 검색
- `position` (선택): 직책으로 필터링
- `department` (선택): 부서로 필터링

**응답:**
```json
{
  "success": true,
  "data": [
    {
      "id": "coordinator-uuid",
      "name": "김실장",
      "hospitalName": "서울대병원",
      "position": "상담실장",
      "department": "성형외과",
      "averageRating": 4.5,
      "reviewCount": 15
    }
  ]
}
```

#### 3.2 코디네이터 상세 정보
```
GET /api/coordinators/{id}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": "coordinator-uuid",
    "name": "김실장",
    "hospitalName": "서울대병원",
    "position": "상담실장",
    "department": "성형외과",
    "ratings": {
      "average": 4.5,
      "professionalism": 4.8,
      "communication": 4.3,
      "responsibility": 4.7,
      "cooperation": 4.4,
      "kindness": 4.6
    },
    "reviewCount": 15,
    "recentReviews": [
      {
        "id": "review-uuid",
        "title": "전문적이고 책임감 있는 실장님",
        "rating": 5,
        "createdAt": "2024-01-27T12:00:00Z"
      }
    ]
  }
}
```

### 4. 사용자 (Users)

#### 4.1 프로필 조회
```
GET /api/users/profile
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "email": "user@hospital.com",
    "name": "김철수",
    "hospitalName": "서울대병원",
    "role": "HOSPITAL_STAFF",
    "verificationStatus": "VERIFIED",
    "reviewCount": 5,
    "joinedAt": "2024-01-01T00:00:00Z"
  }
}
```

#### 4.2 프로필 수정
```
PUT /api/users/profile
```

**요청 본문:**
```json
{
  "name": "김철수",
  "hospitalName": "삼성서울병원"
}
```

## 에러 응답

모든 에러는 다음과 같은 형식으로 반환됩니다:

```json
{
  "success": false,
  "error": "에러 메시지",
  "code": "ERROR_CODE"
}
```

### 에러 코드

- `UNAUTHORIZED`: 인증되지 않은 요청
- `FORBIDDEN`: 권한 없음
- `NOT_FOUND`: 리소스를 찾을 수 없음
- `VALIDATION_ERROR`: 입력값 검증 실패
- `DUPLICATE_REVIEW`: 이미 평가를 작성함
- `NOT_VERIFIED`: 사용자 인증 미완료
- `SERVER_ERROR`: 서버 내부 오류

## 페이지네이션

목록 조회 API는 다음과 같은 페이지네이션 정보를 제공합니다:

```json
{
  "meta": {
    "total": 100,
    "limit": 20,
    "offset": 0,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Rate Limiting

- 인증되지 않은 사용자: 분당 10회
- 인증된 사용자: 분당 100회
- 평가 작성: 시간당 5회

## Webhook (계획 중)

향후 다음과 같은 이벤트에 대한 Webhook을 제공할 예정입니다:

- 새 평가 작성
- 사용자 인증 완료
- 평가 신고 접수