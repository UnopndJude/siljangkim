# 리뷰 시스템 비즈니스 로직

## 리뷰 작성 규칙

### 1. 작성 자격 검증
```typescript
interface ReviewEligibility {
  user: {
    authenticated: boolean; // 인증된 사용자
    notTarget: boolean; // 리뷰 대상이 아닌 사용자
    notBlocked: boolean; // 차단되지 않은 사용자
  };
  target: {
    exists: boolean; // 리뷰 대상 존재
    active: boolean; // 활성 상태
    reviewable: boolean; // 리뷰 가능한 상태
  };
  previousReview: {
    notExists: boolean; // 기존 리뷰 없음
    notRecent: boolean; // 최근 리뷰 작성 제한
  };
}
```

### 2. 리뷰 내용 검증
```typescript
interface ReviewContentValidation {
  rating: {
    min: number; // 1점
    max: number; // 5점
    required: boolean;
  };
  content: {
    minLength: number; // 최소 10자
    maxLength: number; // 최대 500자
    language: string[]; // 허용된 언어
    profanity: boolean; // 욕설 필터링
    medicalAccuracy: boolean; // 의료적 정확성 검증
  };
  categories: {
    required: boolean; // 카테고리 필수
    allowedValues: string[]; // 허용된 카테고리
  };
  images: {
    maxCount: number; // 최대 3장
    maxSize: number; // 최대 5MB
    allowedTypes: string[]; // 허용된 이미지 타입
  };
}
```

### 3. 리뷰 승인 프로세스
```typescript
interface ReviewApprovalProcess {
  automatic: {
    conditions: {
      rating: number; // 3점 이상
      contentLength: number; // 최소 20자
      noProfanity: boolean; // 욕설 없음
      noPersonalInfo: boolean; // 개인정보 없음
    };
  };
  manual: {
    conditions: {
      rating: number; // 3점 미만
      contentLength: number; // 20자 미만
      profanity: boolean; // 욕설 포함
      personalInfo: boolean; // 개인정보 포함
      reported: boolean; // 신고됨
    };
  };
}
```

## 리뷰 통계 계산

### 1. 평점 계산
```typescript
interface RatingCalculation {
  average: {
    method: 'weighted'; // 가중 평균
    weights: {
      recent: number; // 최근 리뷰 가중치
      verified: number; // 인증된 사용자 가중치
      detailed: number; // 상세 리뷰 가중치
    };
  };
  distribution: {
    calculate: boolean; // 분포 계산
    categories: string[]; // 카테고리별 분포
  };
  trends: {
    calculate: boolean; // 트렌드 계산
    period: string; // 기간 (월별, 분기별)
  };
}
```

### 2. 리뷰 신뢰도 계산
```typescript
interface ReviewTrustScore {
  factors: {
    userVerification: number; // 사용자 인증 상태
    reviewHistory: number; // 리뷰 작성 이력
    contentQuality: number; // 내용 품질
    responseRate: number; // 의료진 응답률
  };
  weights: {
    userVerification: 0.3;
    reviewHistory: 0.2;
    contentQuality: 0.3;
    responseRate: 0.2;
  };
}
```

## 리뷰 관리 시스템

### 1. 리뷰 상태 관리
```typescript
interface ReviewStatusManagement {
  states: {
    pending: {
      description: '승인 대기 중';
      visibility: 'private';
      actions: ['approve', 'reject', 'request_revision'];
    };
    approved: {
      description: '승인됨';
      visibility: 'public';
      actions: ['hide', 'flag', 'respond'];
    };
    rejected: {
      description: '거부됨';
      visibility: 'private';
      actions: ['appeal', 'revise'];
    };
    hidden: {
      description: '숨김 처리';
      visibility: 'private';
      actions: ['restore', 'delete'];
    };
    flagged: {
      description: '신고됨';
      visibility: 'under_review';
      actions: ['investigate', 'resolve', 'remove'];
    };
  };
  transitions: {
    pending_to_approved: 'admin_approval';
    pending_to_rejected: 'admin_rejection';
    approved_to_hidden: 'admin_action' | 'user_request';
    approved_to_flagged: 'user_report';
    flagged_to_approved: 'investigation_cleared';
    flagged_to_hidden: 'investigation_confirmed';
  };
}
```

### 2. 리뷰 수정/삭제 규칙
```typescript
interface ReviewModificationRules {
  editability: {
    timeLimit: number; // 24시간
    conditions: {
      notApproved: boolean; // 승인되지 않은 리뷰만
      notResponded: boolean; // 응답이 없는 리뷰만
      notFlagged: boolean; // 신고되지 않은 리뷰만
    };
  };
  deletion: {
    timeLimit: number; // 7일
    conditions: {
      notApproved: boolean;
      notResponded: boolean;
      notFlagged: boolean;
    };
    consequences: {
      affectRating: boolean; // 평점에 영향
      notifyTarget: boolean; // 대상자에게 알림
      logAction: boolean; // 행동 기록
    };
  };
}
```

## 리뷰 신고 및 조사

### 1. 신고 유형
```typescript
interface ReviewReportTypes {
  inappropriate: {
    description: '부적절한 내용';
    examples: ['욕설', '비방', '허위정보'];
    severity: 'medium';
    autoAction: 'hide_temporarily';
  };
  spam: {
    description: '스팸 또는 광고';
    examples: ['상업적 광고', '반복 게시'];
    severity: 'high';
    autoAction: 'hide_immediately';
  };
  fake: {
    description: '가짜 리뷰';
    examples: ['자작 리뷰', '대리 작성'];
    severity: 'high';
    autoAction: 'investigate';
  };
  medicalViolation: {
    description: '의료법 위반';
    examples: ['진단 내용', '처방 정보'];
    severity: 'critical';
    autoAction: 'hide_immediately';
  };
  personalInfo: {
    description: '개인정보 노출';
    examples: ['실명', '연락처', '주소'];
    severity: 'high';
    autoAction: 'hide_immediately';
  };
}
```

### 2. 조사 프로세스
```typescript
interface InvestigationProcess {
  automatic: {
    triggers: {
      multipleReports: number; // 3회 이상 신고
      keywordDetection: boolean; // 키워드 감지
      patternAnalysis: boolean; // 패턴 분석
    };
    actions: {
      temporaryHide: boolean;
      flagForReview: boolean;
      notifyAdmin: boolean;
    };
  };
  manual: {
    assignedTo: 'admin' | 'moderator';
    timeLimit: number; // 48시간
    requiredActions: {
      reviewContent: boolean;
      checkUserHistory: boolean;
      verifyClaims: boolean;
      makeDecision: boolean;
    };
  };
  resolution: {
    options: {
      approve: 'no_violation_found';
      reject: 'violation_confirmed';
      requestRevision: 'minor_issues';
      escalate: 'complex_case';
    };
    consequences: {
      userWarning: boolean;
      accountSuspension: boolean;
      contentRemoval: boolean;
      legalAction: boolean;
    };
  };
}
```

## 리뷰 품질 관리

### 1. 품질 지표
```typescript
interface ReviewQualityMetrics {
  content: {
    length: {
      optimal: { min: 50, max: 300 };
      acceptable: { min: 20, max: 500 };
    };
    readability: {
      score: number; // 0-100
      factors: ['sentence_length', 'vocabulary', 'structure'];
    };
    relevance: {
      medicalContext: boolean;
      personalExperience: boolean;
      constructiveFeedback: boolean;
    };
  };
  user: {
    verification: boolean;
    history: {
      reviewCount: number;
      averageQuality: number;
      consistency: number;
    };
    behavior: {
      responseRate: number;
      editFrequency: number;
      reportHistory: number;
    };
  };
  engagement: {
    helpfulness: number; // 도움됨 투표
    responseRate: number; // 의료진 응답률
    followUpQuestions: number; // 후속 질문
  };
}
```

### 2. 품질 개선 전략
```typescript
interface QualityImprovementStrategy {
  incentives: {
    highQualityRewards: {
      points: number;
      badges: string[];
      visibility: 'featured_review';
    };
    feedback: {
      qualityScore: boolean;
      improvementSuggestions: boolean;
      bestPractices: boolean;
    };
  };
  guidance: {
    templates: {
      structure: string[];
      examples: string[];
      tips: string[];
    };
    realTime: {
      suggestions: boolean;
      warnings: boolean;
      examples: boolean;
    };
  };
  moderation: {
    proactive: {
      contentAnalysis: boolean;
      userBehaviorAnalysis: boolean;
      trendAnalysis: boolean;
    };
    reactive: {
      userReports: boolean;
      automatedFlags: boolean;
      adminReviews: boolean;
    };
  };
}
```

## 리뷰 분석 및 인사이트

### 1. 감정 분석
```typescript
interface SentimentAnalysis {
  overall: {
    positive: number; // 0-100
    neutral: number; // 0-100
    negative: number; // 0-100
  };
  categories: {
    quality: number;
    kindness: number;
    waitingTime: number;
    facility: number;
  };
  trends: {
    monthly: number[];
    quarterly: number[];
    yearly: number[];
  };
  insights: {
    commonComplaints: string[];
    frequentPraise: string[];
    improvementAreas: string[];
  };
}
```

### 2. 텍스트 마이닝
```typescript
interface TextMining {
  keywords: {
    positive: string[];
    negative: string[];
    neutral: string[];
    medical: string[];
  };
  topics: {
    treatment: number;
    communication: number;
    environment: number;
    process: number;
  };
  patterns: {
    commonPhrases: string[];
    sentimentDrivers: string[];
    qualityIndicators: string[];
  };
  recommendations: {
    contentImprovements: string[];
    serviceImprovements: string[];
    trainingNeeds: string[];
  };
}
```

## 리뷰 응답 시스템

### 1. 의료진 응답 규칙
```typescript
interface MedicalProfessionalResponse {
  eligibility: {
    verified: boolean; // 인증된 의료진만
    active: boolean; // 활성 상태
    notBlocked: boolean; // 차단되지 않음
  };
  responseRules: {
    timeLimit: number; // 7일
    maxLength: number; // 500자
    tone: 'professional' | 'friendly' | 'formal';
    content: {
      noMedicalAdvice: boolean;
      noPersonalInfo: boolean;
      constructiveOnly: boolean;
    };
  };
  moderation: {
    preApproval: boolean; // 사전 승인 필요
    keywordFilter: boolean; // 키워드 필터링
    adminReview: boolean; // 관리자 검토
  };
}
```

### 2. 응답 품질 관리
```typescript
interface ResponseQualityManagement {
  guidelines: {
    acknowledge: boolean; // 리뷰 인정
    explain: boolean; // 상황 설명
    apologize: boolean; // 사과 (필요시)
    improve: boolean; // 개선 의지 표현
    thank: boolean; // 감사 표현
  };
  prohibited: {
    defensive: boolean; // 방어적 태도
    argumentative: boolean; // 논쟁적 태도
    dismissive: boolean; // 무시하는 태도
    medicalAdvice: boolean; // 의료 조언
  };
  metrics: {
    responseRate: number; // 응답률
    responseTime: number; // 평균 응답 시간
    satisfactionImprovement: number; // 만족도 개선
    followUpReviews: number; // 후속 리뷰
  };
}
```

