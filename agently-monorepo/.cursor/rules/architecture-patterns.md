# 아키텍처 패턴 (Architecture Patterns)

## Clean Architecture 원칙

### 레이어 구조
```
src/
├── domain/           # 비즈니스 로직 (의존성 없음)
│   ├── entities/     # 엔티티
│   ├── value-objects/ # 값 객체
│   ├── repositories/ # 리포지토리 인터페이스
│   └── services/     # 도메인 서비스
├── application/      # 유스케이스 (애플리케이션 로직)
│   └── use-cases/    # 유스케이스 구현
└── infrastructure/   # 외부 의존성 (데이터베이스, API)
    ├── repositories/ # 리포지토리 구현
    └── services/     # 인프라 서비스
```

### 의존성 방향
- Domain ← Application ← Infrastructure
- 외부 레이어는 내부 레이어를 의존할 수 있음
- 내부 레이어는 외부 레이어를 의존할 수 없음

## Domain-Driven Design (DDD)

### 엔티티 (Entity)
```typescript
// domain/entities/User.ts
export class User {
  private constructor(
    private readonly _id: UserId,
    private _email: Email,
    private _name: string
  ) {}

  static create(email: string, name: string): User {
    return new User(
      UserId.generate(),
      Email.create(email),
      name
    );
  }

  get id(): UserId {
    return this._id;
  }

  get email(): Email {
    return this._email;
  }
}
```

### 값 객체 (Value Object)
```typescript
// domain/value-objects/Email.ts
export class Email {
  private constructor(private readonly value: string) {}

  static create(email: string): Email {
    if (!this.isValid(email)) {
      throw new Error('유효하지 않은 이메일 형식입니다.');
    }
    return new Email(email);
  }

  private static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  toString(): string {
    return this.value;
  }
}
```

### 리포지토리 패턴
```typescript
// domain/repositories/IUserRepository.ts
export interface IUserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
}
```

## 유스케이스 패턴

### 유스케이스 구현
```typescript
// application/use-cases/auth/LoginUserUseCase.ts
export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService
  ) {}

  async execute(request: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(request.email);
    
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    // 비즈니스 로직 검증
    if (!user.isPasswordValid(request.password)) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    const token = this.tokenService.generateToken(user.id);
    
    return {
      user: user.toDTO(),
      token
    };
  }
}
```

## 의존성 주입

### 인터페이스 정의
```typescript
// domain/services/IEmailService.ts
export interface IEmailService {
  sendWelcomeEmail(user: User): Promise<void>;
  sendPasswordResetEmail(user: User, token: string): Promise<void>;
}
```

### 구현체
```typescript
// infrastructure/services/EmailService.ts
export class EmailService implements IEmailService {
  async sendWelcomeEmail(user: User): Promise<void> {
    // 이메일 발송 로직
  }

  async sendPasswordResetEmail(user: User, token: string): Promise<void> {
    // 비밀번호 재설정 이메일 발송 로직
  }
}
```

## 에러 처리 패턴

### 도메인 에러
```typescript
// domain/errors/DomainError.ts
export abstract class DomainError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;
}

export class UserNotFoundError extends DomainError {
  readonly code = 'USER_NOT_FOUND';
  readonly statusCode = 404;
  
  constructor(userId: string) {
    super(`사용자를 찾을 수 없습니다: ${userId}`);
  }
}
```

### 유스케이스에서 에러 처리
```typescript
export class GetUserUseCase {
  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(new UserId(userId));
    
    if (!user) {
      throw new UserNotFoundError(userId);
    }
    
    return user;
  }
}
```

## 테스트 패턴

### 단위 테스트
```typescript
describe('User', () => {
  it('should create user with valid email', () => {
    const user = User.create('test@example.com', 'Test User');
    expect(user.email.toString()).toBe('test@example.com');
  });

  it('should throw error with invalid email', () => {
    expect(() => {
      User.create('invalid-email', 'Test User');
    }).toThrow('유효하지 않은 이메일 형식입니다.');
  });
});
```

### 통합 테스트
```typescript
describe('LoginUserUseCase', () => {
  let useCase: LoginUserUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
      // ... 기타 메서드
    };
    useCase = new LoginUserUseCase(mockUserRepository, mockTokenService);
  });

  it('should login user with valid credentials', async () => {
    // Given
    const user = User.create('test@example.com', 'Test User');
    mockUserRepository.findByEmail.mockResolvedValue(user);

    // When
    const result = await useCase.execute({
      email: 'test@example.com',
      password: 'password'
    });

    // Then
    expect(result.user.email.toString()).toBe('test@example.com');
  });
});
```
