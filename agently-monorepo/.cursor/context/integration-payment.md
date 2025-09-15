# 결제 시스템 연동

## 결제 게이트웨이 통합

### 1. Toss Payments 연동
```typescript
interface TossPaymentsIntegration {
  configuration: {
    clientKey: string;
    secretKey: string;
    environment: 'sandbox' | 'production';
    webhookSecret: string;
  };
  features: {
    cardPayment: boolean;
    bankTransfer: boolean;
    virtualAccount: boolean;
    mobilePayment: boolean;
    easyPay: boolean;
  };
  security: {
    encryption: 'AES-256';
    tokenization: boolean;
    pciCompliance: boolean;
  };
  limits: {
    maxAmount: number; // 1,000,000원
    dailyLimit: number; // 10,000,000원
    monthlyLimit: number; // 100,000,000원
  };
}
```

### 2. Iamport 연동
```typescript
interface IamportIntegration {
  configuration: {
    apiKey: string;
    secretKey: string;
    environment: 'sandbox' | 'production';
    webhookSecret: string;
  };
  features: {
    cardPayment: boolean;
    bankTransfer: boolean;
    virtualAccount: boolean;
    mobilePayment: boolean;
    kakaoPay: boolean;
    payco: boolean;
  };
  security: {
    encryption: 'AES-256';
    tokenization: boolean;
    fraudDetection: boolean;
  };
  limits: {
    maxAmount: number;
    dailyLimit: number;
    monthlyLimit: number;
  };
}
```

### 3. Stripe 연동
```typescript
interface StripeIntegration {
  configuration: {
    publishableKey: string;
    secretKey: string;
    environment: 'test' | 'live';
    webhookSecret: string;
  };
  features: {
    cardPayment: boolean;
    bankTransfer: boolean;
    digitalWallet: boolean;
    subscription: boolean;
    marketplace: boolean;
  };
  security: {
    encryption: 'AES-256';
    tokenization: boolean;
    fraudDetection: boolean;
  };
  limits: {
    maxAmount: number;
    dailyLimit: number;
    monthlyLimit: number;
  };
}
```

## 결제 플로우

### 1. 결제 요청 처리
```typescript
interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  metadata: {
    serviceType: 'consultation' | 'review' | 'premium';
    medicalProfessionalId: string;
    appointmentId?: string;
  };
}

interface PaymentResponse {
  success: boolean;
  paymentId: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  amount: number;
  currency: string;
  method: string;
  transactionId: string;
  receiptUrl?: string;
  error?: {
    code: string;
    message: string;
  };
}
```

### 2. 결제 상태 관리
```typescript
interface PaymentStatus {
  states: {
    pending: {
      description: '결제 대기 중';
      actions: ['complete', 'cancel', 'timeout'];
      timeout: number; // 30분
    };
    completed: {
      description: '결제 완료';
      actions: ['refund', 'dispute'];
      final: boolean;
    };
    failed: {
      description: '결제 실패';
      actions: ['retry', 'cancel'];
      retryable: boolean;
    };
    cancelled: {
      description: '결제 취소';
      actions: ['retry'];
      final: boolean;
    };
    refunded: {
      description: '환불 완료';
      actions: [];
      final: boolean;
    };
  };
  transitions: {
    pending_to_completed: 'payment_success';
    pending_to_failed: 'payment_failure';
    pending_to_cancelled: 'user_cancellation' | 'timeout';
    completed_to_refunded: 'refund_request';
    failed_to_pending: 'retry_payment';
  };
}
```

## 환불 시스템

### 1. 환불 정책
```typescript
interface RefundPolicy {
  eligibility: {
    timeLimit: number; // 7일
    conditions: {
      serviceNotUsed: boolean;
      technicalIssue: boolean;
      userRequest: boolean;
      policyViolation: boolean;
    };
  };
  processing: {
    automatic: {
      conditions: {
        timeLimit: boolean;
        amountLimit: number; // 50,000원 이하
        serviceType: string[]; // ['consultation']
      };
    };
    manual: {
      conditions: {
        highAmount: boolean;
        dispute: boolean;
        complexCase: boolean;
      };
      approvalRequired: boolean;
      timeLimit: number; // 3일
    };
  };
  fees: {
    processingFee: number; // 0원
    cancellationFee: number; // 0원
    refundFee: number; // 0원
  };
}
```

### 2. 환불 처리
```typescript
interface RefundRequest {
  paymentId: string;
  amount: number;
  reason: string;
  requestedBy: string;
  requestedAt: Date;
  evidence?: string[]; // 증빙 자료
}

interface RefundResponse {
  success: boolean;
  refundId: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  estimatedCompletion: Date;
  actualCompletion?: Date;
  error?: {
    code: string;
    message: string;
  };
}
```

## 구독 서비스

### 1. 구독 플랜
```typescript
interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
    currency: string;
  };
  features: {
    maxReviews: number;
    advancedSearch: boolean;
    prioritySupport: boolean;
    analytics: boolean;
    apiAccess: boolean;
  };
  limits: {
    users: number;
    storage: number; // GB
    apiCalls: number;
  };
  trial: {
    enabled: boolean;
    duration: number; // 일
    features: string[];
  };
}
```

### 2. 구독 관리
```typescript
interface SubscriptionManagement {
  create: {
    planId: string;
    customerId: string;
    paymentMethod: string;
    billingCycle: 'monthly' | 'yearly';
    trialPeriod?: number;
  };
  update: {
    planId?: string;
    paymentMethod?: string;
    billingCycle?: 'monthly' | 'yearly';
  };
  cancel: {
    reason: string;
    effectiveDate: 'immediate' | 'end_of_period';
    refundPolicy: 'prorated' | 'none';
  };
  pause: {
    duration: number; // 일
    reason: string;
    autoResume: boolean;
  };
}
```

## 보험 연동

### 1. 건강보험 연동
```typescript
interface HealthInsuranceIntegration {
  provider: 'national' | 'private';
  endpoints: {
    eligibility: string;
    benefits: string;
    claims: string;
    status: string;
  };
  authentication: {
    method: 'certificate' | 'api_key';
    credentials: {
      certificate?: string;
      apiKey?: string;
      secret?: string;
    };
  };
  functions: {
    checkEligibility: (patientId: string) => Promise<boolean>;
    calculateBenefits: (service: string, amount: number) => Promise<number>;
    submitClaim: (claim: ClaimData) => Promise<string>;
    getClaimStatus: (claimId: string) => Promise<ClaimStatus>;
  };
}
```

### 2. 청구 처리
```typescript
interface ClaimProcessing {
  submission: {
    patientId: string;
    serviceId: string;
    amount: number;
    date: Date;
    diagnosis?: string;
    treatment?: string;
  };
  validation: {
    eligibility: boolean;
    coverage: boolean;
    amount: boolean;
    documentation: boolean;
  };
  processing: {
    automatic: boolean;
    timeLimit: number; // 7일
    approvalRequired: boolean;
  };
  payment: {
    method: 'direct' | 'reimbursement';
    timeLimit: number; // 14일
    amount: number;
    patientResponsibility: number;
  };
}
```

## 세금 및 영수증

### 1. 세금 계산
```typescript
interface TaxCalculation {
  vat: {
    rate: number; // 10%
    included: boolean;
    calculation: 'inclusive' | 'exclusive';
  };
  incomeTax: {
    applicable: boolean;
    rate: number;
    threshold: number;
  };
  localTax: {
    applicable: boolean;
    rate: number;
    jurisdiction: string;
  };
  exemptions: {
    medicalServices: boolean;
    education: boolean;
    charity: boolean;
  };
}
```

### 2. 영수증 발급
```typescript
interface ReceiptGeneration {
  types: {
    simple: {
      description: '간이 영수증';
      requirements: ['amount', 'date', 'service'];
      taxDeductible: boolean;
    };
    detailed: {
      description: '상세 영수증';
      requirements: ['amount', 'date', 'service', 'provider', 'tax'];
      taxDeductible: boolean;
    };
    invoice: {
      description: '세금계산서';
      requirements: ['amount', 'date', 'service', 'provider', 'tax', 'business_number'];
      taxDeductible: true;
    };
  };
  delivery: {
    email: boolean;
    sms: boolean;
    download: boolean;
    print: boolean;
  };
  storage: {
    duration: number; // 5년
    format: 'pdf' | 'html' | 'json';
    backup: boolean;
  };
}
```

## 결제 보안

### 1. PCI DSS 준수
```typescript
interface PCIDSSCompliance {
  requirements: {
    secureNetwork: boolean;
    cardholderData: boolean;
    vulnerabilityManagement: boolean;
    accessControl: boolean;
    networkMonitoring: boolean;
    securityPolicy: boolean;
  };
  implementation: {
    encryption: 'AES-256';
    tokenization: boolean;
    secureTransmission: 'TLS 1.3';
    accessLogging: boolean;
    regularTesting: boolean;
  };
  certification: {
    level: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4';
    status: 'certified' | 'pending' | 'expired';
    expiryDate: Date;
    auditor: string;
  };
}
```

### 2. 사기 방지
```typescript
interface FraudPrevention {
  detection: {
    machineLearning: boolean;
    ruleBased: boolean;
    behavioralAnalysis: boolean;
    deviceFingerprinting: boolean;
  };
  rules: {
    velocity: {
      maxTransactions: number; // 시간당
      maxAmount: number; // 일일
    };
    geography: {
      countryRestrictions: string[];
      ipWhitelist: string[];
      locationVerification: boolean;
    };
    behavior: {
      unusualPatterns: boolean;
      riskScoring: boolean;
      userHistory: boolean;
    };
  };
  response: {
    automatic: {
      block: boolean;
      challenge: boolean;
      review: boolean;
    };
    manual: {
      investigation: boolean;
      approval: boolean;
      rejection: boolean;
    };
  };
}
```

## 결제 분석 및 리포팅

### 1. 결제 분석
```typescript
interface PaymentAnalytics {
  metrics: {
    volume: {
      daily: number;
      monthly: number;
      yearly: number;
    };
    success: {
      rate: number;
      byMethod: Record<string, number>;
      byAmount: Record<string, number>;
    };
    failure: {
      rate: number;
      reasons: Record<string, number>;
      trends: number[];
    };
  };
  insights: {
    peakHours: number[];
    popularMethods: string[];
    averageAmount: number;
    conversionRate: number;
  };
  forecasting: {
    nextMonth: number;
    nextQuarter: number;
    nextYear: number;
    confidence: number;
  };
}
```

### 2. 리포팅
```typescript
interface PaymentReporting {
  reports: {
    daily: {
      transactions: number;
      volume: number;
      success: number;
      failures: number;
    };
    monthly: {
      transactions: number;
      volume: number;
      growth: number;
      topMethods: string[];
    };
    yearly: {
      transactions: number;
      volume: number;
      growth: number;
      trends: number[];
    };
  };
  exports: {
    format: 'csv' | 'xlsx' | 'pdf' | 'json';
    schedule: 'daily' | 'weekly' | 'monthly';
    recipients: string[];
    filters: {
      dateRange: Date[];
      amountRange: number[];
      methods: string[];
      status: string[];
    };
  };
}
```

