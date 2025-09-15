# Domain-Driven Design (DDD) 패턴

## DDD 핵심 개념

### 바운디드 컨텍스트 (Bounded Context)
```typescript
// 사용자 관리 컨텍스트
namespace UserManagement {
  export class User {
    // 사용자 관리에 특화된 속성과 행동
  }
  
  export class UserService {
    // 사용자 관리 비즈니스 로직
  }
}

// 리뷰 관리 컨텍스트
namespace ReviewManagement {
  export class Review {
    // 리뷰 관리에 특화된 속성과 행동
  }
  
  export class ReviewService {
    // 리뷰 관리 비즈니스 로직
  }
}
```

### 애그리게이트 (Aggregate)
```typescript
// User 애그리게이트
export class User {
  private constructor(
    private readonly _id: UserId,
    private _email: Email,
    private _name: string,
    private _reviews: Review[] = []
  ) {}

  // 팩토리 메서드
  static create(email: string, name: string): User {
    return new User(
      UserId.generate(),
      Email.create(email),
      name
    );
  }

  // 비즈니스 규칙: 사용자는 자신에 대한 리뷰를 작성할 수 없음
  canWriteReview(targetId: string): boolean {
    return this._id.value !== targetId;
  }

  // 비즈니스 규칙: 사용자는 하루에 최대 10개의 리뷰를 작성할 수 있음
  canWriteMoreReviews(): boolean {
    const today = new Date();
    const todayReviews = this._reviews.filter(review => 
      review.createdAt.toDateString() === today.toDateString()
    );
    return todayReviews.length < 10;
  }

  // 애그리게이트 루트에서 리뷰 추가
  addReview(review: Review): void {
    if (!this.canWriteReview(review.targetId.value)) {
      throw new Error('자신에 대한 리뷰는 작성할 수 없습니다');
    }

    if (!this.canWriteMoreReviews()) {
      throw new Error('하루 리뷰 작성 한도를 초과했습니다');
    }

    this._reviews.push(review);
  }

  // 불변성 보장
  get reviews(): ReadonlyArray<Review> {
    return [...this._reviews];
  }
}
```

### 도메인 이벤트 (Domain Events)
```typescript
// 도메인 이벤트 인터페이스
export interface DomainEvent {
  readonly occurredOn: Date;
  readonly eventId: string;
}

// 사용자 생성 이벤트
export class UserCreatedEvent implements DomainEvent {
  readonly occurredOn: Date;
  readonly eventId: string;

  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly name: string
  ) {
    this.occurredOn = new Date();
    this.eventId = generateEventId();
  }
}

// 리뷰 작성 이벤트
export class ReviewCreatedEvent implements DomainEvent {
  readonly occurredOn: Date;
  readonly eventId: string;

  constructor(
    public readonly reviewId: string,
    public readonly authorId: string,
    public readonly targetId: string,
    public readonly rating: number
  ) {
    this.occurredOn = new Date();
    this.eventId = generateEventId();
  }
}

// 이벤트 발행자
export class EventPublisher {
  private static instance: EventPublisher;
  private handlers = new Map<string, Function[]>();

  static getInstance(): EventPublisher {
    if (!EventPublisher.instance) {
      EventPublisher.instance = new EventPublisher();
    }
    return EventPublisher.instance;
  }

  subscribe<T extends DomainEvent>(
    eventType: string,
    handler: (event: T) => void
  ): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);
  }

  publish(event: DomainEvent): void {
    const eventType = event.constructor.name;
    const handlers = this.handlers.get(eventType) || [];
    
    handlers.forEach(handler => {
      try {
        handler(event);
      } catch (error) {
        console.error(`Error handling event ${eventType}:`, error);
      }
    });
  }
}
```

## 도메인 서비스

### 복잡한 비즈니스 로직
```typescript
// 리뷰 접근 권한 서비스
export class ReviewAccessService {
  constructor(
    private userRepository: IUserRepository,
    private reviewRepository: IReviewRepository
  ) {}

  async canUserAccessReview(
    userId: UserId,
    reviewId: ReviewId
  ): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    const review = await this.reviewRepository.findById(reviewId);

    if (!user || !review) {
      return false;
    }

    // 작성자는 자신의 리뷰에 접근 가능
    if (review.authorId.equals(userId)) {
      return true;
    }

    // 리뷰 대상자는 자신에 대한 리뷰에 접근 가능
    if (review.targetId.equals(userId)) {
      return true;
    }

    // 관리자는 모든 리뷰에 접근 가능
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    return false;
  }

  async canUserModifyReview(
    userId: UserId,
    reviewId: ReviewId
  ): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    const review = await this.reviewRepository.findById(reviewId);

    if (!user || !review) {
      return false;
    }

    // 작성자만 수정 가능
    if (review.authorId.equals(userId)) {
      return true;
    }

    // 관리자는 수정 가능
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    return false;
  }
}
```

### 도메인 계산 서비스
```typescript
// 평점 계산 서비스
export class RatingCalculationService {
  calculateAverageRating(reviews: Review[]): number {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((totalRating / reviews.length) * 10) / 10;
  }

  calculateRatingDistribution(reviews: Review[]): Record<number, number> {
    const distribution: Record<number, number> = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    };

    reviews.forEach(review => {
      distribution[review.rating]++;
    });

    return distribution;
  }

  calculateWeightedRating(reviews: Review[]): number {
    if (reviews.length === 0) {
      return 0;
    }

    // 최근 리뷰에 더 높은 가중치 부여
    const now = new Date();
    const weightedSum = reviews.reduce((sum, review) => {
      const daysSinceReview = Math.floor(
        (now.getTime() - review.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      // 30일 이내 리뷰는 1.0, 그 이후는 0.8 가중치
      const weight = daysSinceReview <= 30 ? 1.0 : 0.8;
      
      return sum + (review.rating * weight);
    }, 0);

    const totalWeight = reviews.reduce((sum, review) => {
      const daysSinceReview = Math.floor(
        (now.getTime() - review.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );
      const weight = daysSinceReview <= 30 ? 1.0 : 0.8;
      return sum + weight;
    }, 0);

    return Math.round((weightedSum / totalWeight) * 10) / 10;
  }
}
```

## 스펙ification 패턴

### 복잡한 검색 조건
```typescript
// 스펙 인터페이스
export interface Specification<T> {
  isSatisfiedBy(candidate: T): boolean;
  and(other: Specification<T>): Specification<T>;
  or(other: Specification<T>): Specification<T>;
  not(): Specification<T>;
}

// 사용자 스펙
export class UserSpecification implements Specification<User> {
  constructor(
    private conditions: {
      role?: UserRole;
      isVerified?: boolean;
      hasReviews?: boolean;
      minRating?: number;
    }
  ) {}

  isSatisfiedBy(user: User): boolean {
    if (this.conditions.role && user.role !== this.conditions.role) {
      return false;
    }

    if (this.conditions.isVerified !== undefined && 
        user.isVerified !== this.conditions.isVerified) {
      return false;
    }

    if (this.conditions.hasReviews !== undefined) {
      const hasReviews = user.reviews.length > 0;
      if (hasReviews !== this.conditions.hasReviews) {
        return false;
      }
    }

    if (this.conditions.minRating !== undefined) {
      const averageRating = this.calculateAverageRating(user.reviews);
      if (averageRating < this.conditions.minRating) {
        return false;
      }
    }

    return true;
  }

  and(other: Specification<User>): Specification<User> {
    return new AndSpecification(this, other);
  }

  or(other: Specification<User>): Specification<User> {
    return new OrSpecification(this, other);
  }

  not(): Specification<User> {
    return new NotSpecification(this);
  }

  private calculateAverageRating(reviews: Review[]): number {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  }
}

// 복합 스펙
export class AndSpecification<T> implements Specification<T> {
  constructor(
    private left: Specification<T>,
    private right: Specification<T>
  ) {}

  isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) && 
           this.right.isSatisfiedBy(candidate);
  }

  and(other: Specification<T>): Specification<T> {
    return new AndSpecification(this, other);
  }

  or(other: Specification<T>): Specification<T> {
    return new OrSpecification(this, other);
  }

  not(): Specification<T> {
    return new NotSpecification(this);
  }
}
```

## 팩토리 패턴

### 복잡한 객체 생성
```typescript
// 사용자 팩토리
export class UserFactory {
  static createPatient(email: string, name: string): User {
    return User.create(email, name, UserRole.PATIENT);
  }

  static createDoctor(
    email: string, 
    name: string, 
    medicalLicenseNumber: string,
    specialty: string
  ): Doctor {
    const user = User.create(email, name, UserRole.DOCTOR);
    return Doctor.create(
      user.id,
      medicalLicenseNumber,
      specialty
    );
  }

  static createCoordinator(
    email: string,
    name: string,
    specialty: string,
    experience: number
  ): Coordinator {
    const user = User.create(email, name, UserRole.COORDINATOR);
    return Coordinator.create(
      user.id,
      specialty,
      experience
    );
  }
}

// 리뷰 팩토리
export class ReviewFactory {
  static createReview(
    authorId: UserId,
    targetId: UserId,
    targetType: 'doctor' | 'coordinator',
    rating: number,
    content: string
  ): Review {
    // 비즈니스 규칙 검증
    if (authorId.equals(targetId)) {
      throw new Error('자신에 대한 리뷰는 작성할 수 없습니다');
    }

    if (rating < 1 || rating > 5) {
      throw new Error('평점은 1-5 사이여야 합니다');
    }

    if (content.length < 10) {
      throw new Error('리뷰 내용은 최소 10자 이상이어야 합니다');
    }

    return Review.create(
      authorId,
      targetId,
      targetType,
      rating,
      content
    );
  }
}
```

## 리포지토리 패턴

### 복잡한 쿼리
```typescript
// 사용자 리포지토리
export interface IUserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  findBySpecification(spec: Specification<User>): Promise<User[]>;
  findTopRatedUsers(limit: number): Promise<User[]>;
  findUsersWithRecentReviews(days: number): Promise<User[]>;
  save(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
}

// 리뷰 리포지토리
export interface IReviewRepository {
  findById(id: ReviewId): Promise<Review | null>;
  findByAuthor(authorId: UserId): Promise<Review[]>;
  findByTarget(targetId: UserId): Promise<Review[]>;
  findByRatingRange(min: number, max: number): Promise<Review[]>;
  findRecentReviews(days: number): Promise<Review[]>;
  findReviewsBySpecification(spec: Specification<Review>): Promise<Review[]>;
  save(review: Review): Promise<void>;
  delete(id: ReviewId): Promise<void>;
}
```

## 도메인 모델 테스트

### 단위 테스트
```typescript
describe('User', () => {
  describe('리뷰 작성 권한', () => {
    it('자신에 대한 리뷰는 작성할 수 없다', () => {
      const user = UserFactory.createPatient('test@example.com', '테스트');
      const review = ReviewFactory.createReview(
        user.id,
        user.id, // 같은 사용자 ID
        'doctor',
        5,
        '좋은 의사입니다'
      );

      expect(() => user.addReview(review)).toThrow(
        '자신에 대한 리뷰는 작성할 수 없습니다'
      );
    });

    it('하루 리뷰 작성 한도를 초과하면 에러가 발생한다', () => {
      const user = UserFactory.createPatient('test@example.com', '테스트');
      
      // 10개의 리뷰 추가
      for (let i = 0; i < 10; i++) {
        const review = ReviewFactory.createReview(
          user.id,
          UserId.generate(),
          'doctor',
          5,
          `리뷰 ${i + 1}`
        );
        user.addReview(review);
      }

      // 11번째 리뷰 추가 시도
      const review11 = ReviewFactory.createReview(
        user.id,
        UserId.generate(),
        'doctor',
        5,
        '리뷰 11'
      );

      expect(() => user.addReview(review11)).toThrow(
        '하루 리뷰 작성 한도를 초과했습니다'
      );
    });
  });
});

describe('RatingCalculationService', () => {
  it('평균 평점을 올바르게 계산한다', () => {
    const service = new RatingCalculationService();
    const reviews = [
      ReviewFactory.createReview(UserId.generate(), UserId.generate(), 'doctor', 5, '좋음'),
      ReviewFactory.createReview(UserId.generate(), UserId.generate(), 'doctor', 3, '보통'),
      ReviewFactory.createReview(UserId.generate(), UserId.generate(), 'doctor', 4, '양호')
    ];

    const average = service.calculateAverageRating(reviews);
    expect(average).toBe(4.0);
  });
});
```

