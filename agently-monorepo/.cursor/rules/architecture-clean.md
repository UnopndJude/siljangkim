# Clean Architecture 패턴

## 아키텍처 원칙

### 의존성 규칙
```
외부 레이어는 내부 레이어를 의존할 수 있음
내부 레이어는 외부 레이어를 의존할 수 없음

Domain ← Application ← Infrastructure
```

### Feature-Sliced Design 구조
```
src/
├── features/         # 기능별 모듈
│   └── {feature-name}/
│       ├── ui/       # 사용자 인터페이스
│       ├── application/ # 애플리케이션 로직
│       ├── domain/   # 도메인 모델
│       └── infrastructure/ # 외부 의존성
├── shared/           # 공통 모듈
│   ├── ui/           # 공통 UI 컴포넌트
│   ├── lib/          # 유틸리티
│   └── types/        # 공통 타입
└── app/              # 애플리케이션 설정
```

### 의존성 주입 원칙
- **원칙**: "모든 도메인 객체와 서비스는 `useDependencies` 훅을 통해서만 초기화하고 주입받아야 한다."
- **규칙**:
  - `useDependencies` 훅 사용 의무
  - Factory 패턴 금지
  - 직접 인스턴스화 금지
  - Container 직접 사용 금지

## Domain Layer

### 엔티티 (Entity)
```typescript
// domain/entities/User.ts
export class User {
  private constructor(
    private readonly _id: UserId,
    private _email: Email,
    private _name: string,
    private _role: UserRole
  ) {}

  static create(email: string, name: string, role: UserRole): User {
    return new User(
      UserId.generate(),
      Email.create(email),
      name,
      role
    );
  }

  get id(): UserId {
    return this._id;
  }

  get email(): Email {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get role(): UserRole {
    return this._role;
  }

  updateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('이름은 필수입니다');
    }
    this._name = name.trim();
  }

  updateEmail(email: string): void {
    this._email = Email.create(email);
  }

  toDTO(): UserDTO {
    return {
      id: this._id.value,
      email: this._email.value,
      name: this._name,
      role: this._role
    };
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
      throw new Error('유효하지 않은 이메일 형식입니다');
    }
    return new Email(email.toLowerCase().trim());
  }

  private static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  get value(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
```

### 리포지토리 인터페이스
```typescript
// domain/repositories/IUserRepository.ts
export interface IUserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
  findAll(): Promise<User[]>;
  findByRole(role: UserRole): Promise<User[]>;
}
```

### 도메인 서비스
```typescript
// domain/services/UserVerificationService.ts
export class UserVerificationService {
  constructor(
    private userRepository: IUserRepository,
    private emailService: IEmailService
  ) {}

  async verifyUser(userId: UserId): Promise<void> {
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다');
    }

    if (user.isVerified) {
      throw new Error('이미 인증된 사용자입니다');
    }

    await this.emailService.sendVerificationEmail(user.email);
  }

  async confirmVerification(userId: UserId, token: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다');
    }

    const isValidToken = await this.emailService.verifyToken(token);
    
    if (!isValidToken) {
      throw new Error('유효하지 않은 인증 토큰입니다');
    }

    user.markAsVerified();
    await this.userRepository.save(user);
  }
}
```

## Application Layer

### 유스케이스 인터페이스
```typescript
// application/use-cases/auth/LoginUserUseCase.ts
export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  user: UserDTO;
  token: string;
  refreshToken: string;
}

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService,
    private tokenService: ITokenService
  ) {}

  async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
    const email = Email.create(request.email);
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다');
    }

    const isPasswordValid = await this.passwordService.verify(
      request.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new Error('비밀번호가 일치하지 않습니다');
    }

    const token = this.tokenService.generateAccessToken(user.id);
    const refreshToken = this.tokenService.generateRefreshToken(user.id);

    return {
      user: user.toDTO(),
      token,
      refreshToken
    };
  }
}
```

### 유스케이스 구현
```typescript
// application/use-cases/user/CreateUserUseCase.ts
export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role: UserRole;
}

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService,
    private emailService: IEmailService
  ) {}

  async execute(request: CreateUserRequest): Promise<UserDTO> {
    const email = Email.create(request.email);
    
    // 이메일 중복 확인
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('이미 존재하는 이메일입니다');
    }

    // 비밀번호 해시화
    const passwordHash = await this.passwordService.hash(request.password);

    // 사용자 생성
    const user = User.create(
      request.email,
      request.name,
      request.role
    );

    // 비밀번호 설정
    user.setPasswordHash(passwordHash);

    // 저장
    await this.userRepository.save(user);

    // 환영 이메일 발송
    await this.emailService.sendWelcomeEmail(user.email, user.name);

    return user.toDTO();
  }
}
```

## Infrastructure Layer

### 리포지토리 구현
```typescript
// infrastructure/repositories/PrismaUserRepository.ts
export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: UserId): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { id: id.value }
    });

    if (!userData) {
      return null;
    }

    return this.toDomain(userData);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email: email.value }
    });

    if (!userData) {
      return null;
    }

    return this.toDomain(userData);
  }

  async save(user: User): Promise<void> {
    const userData = user.toDTO();
    
    await this.prisma.user.upsert({
      where: { id: userData.id },
      update: {
        email: userData.email,
        name: userData.name,
        role: userData.role,
        updatedAt: new Date()
      },
      create: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  }

  async delete(id: UserId): Promise<void> {
    await this.prisma.user.delete({
      where: { id: id.value }
    });
  }

  async findAll(): Promise<User[]> {
    const usersData = await this.prisma.user.findMany();
    return usersData.map(data => this.toDomain(data));
  }

  async findByRole(role: UserRole): Promise<User[]> {
    const usersData = await this.prisma.user.findMany({
      where: { role }
    });
    return usersData.map(data => this.toDomain(data));
  }

  private toDomain(userData: any): User {
    return User.create(
      userData.email,
      userData.name,
      userData.role
    );
  }
}
```

### 인프라 서비스
```typescript
// infrastructure/services/TokenService.ts
export class TokenService implements ITokenService {
  constructor(
    private jwtSecret: string,
    private accessTokenExpiry: string,
    private refreshTokenExpiry: string
  ) {}

  generateAccessToken(userId: UserId): string {
    return jwt.sign(
      { userId: userId.value, type: 'access' },
      this.jwtSecret,
      { expiresIn: this.accessTokenExpiry }
    );
  }

  generateRefreshToken(userId: UserId): string {
    return jwt.sign(
      { userId: userId.value, type: 'refresh' },
      this.jwtSecret,
      { expiresIn: this.refreshTokenExpiry }
    );
  }

  verifyToken(token: string): { userId: string; type: string } {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as any;
      return { userId: decoded.userId, type: decoded.type };
    } catch (error) {
      throw new Error('유효하지 않은 토큰입니다');
    }
  }
}
```

## 의존성 주입

### React Context를 통한 의존성 주입
```typescript
// shared/providers/DependencyProvider.tsx
interface Dependencies {
  userService: IUserService;
  authService: IAuthService;
  reviewService: IReviewService;
}

const DependencyContext = createContext<Dependencies | null>(null);

export const DependencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dependencies = useMemo(() => {
    const container = initializeAppContainer();
    return {
      userService: container.userService,
      authService: container.authService,
      reviewService: container.reviewService,
    };
  }, []);

  return (
    <DependencyContext.Provider value={dependencies}>
      {children}
    </DependencyContext.Provider>
  );
};

export const useDependencies = (): Dependencies => {
  const context = useContext(DependencyContext);
  if (!context) {
    throw new Error('useDependencies must be used within DependencyProvider');
  }
  return context;
};
```

### 올바른 의존성 주입 사용법
```typescript
// ✅ 올바른 방식: useDependencies 훅 사용
import { useDependencies } from '@/shared/providers/DependencyProvider';

export function UserProfile() {
  const { userService, authService } = useDependencies();
  
  const handleUpdateProfile = async (data: UpdateUserData) => {
    const result = await userService.updateProfile(data);
    // ...
  };
  
  return <div>...</div>;
}
```

### 잘못된 의존성 주입 (금지)
```typescript
// ❌ 잘못된 방식: Factory 패턴 사용
import { createUserService } from '@/features/user/infrastructure/factories/userServiceFactory';

export function UserProfile() {
  const userService = createUserService(); // 금지!
  // ...
}

// ❌ 잘못된 방식: 직접 인스턴스화
import { UserService } from '@/features/user/application/UserService';

export function UserProfile() {
  const userService = new UserService(); // 금지!
  // ...
}
```

## 횡단 관심사 처리 원칙

### 데코레이터 패턴을 통한 분리
```typescript
// 핵심 비즈니스 로직 (application 계층)
export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(userData: CreateUserData): Promise<User> {
    // 순수한 비즈니스 로직만
    const user = User.create(userData);
    await this.userRepository.save(user);
    return user;
  }
}

// 횡단 관심사 데코레이터 (infrastructure 계층)
export class LoggedUserService extends UserService {
  constructor(
    userRepository: IUserRepository,
    private logger: ILogger
  ) {
    super(userRepository);
  }

  async createUser(userData: CreateUserData): Promise<User> {
    this.logger.info('Creating user', { email: userData.email });
    
    try {
      const user = await super.createUser(userData);
      this.logger.info('User created successfully', { userId: user.id });
      return user;
    } catch (error) {
      this.logger.error('Failed to create user', { error, userData });
      throw error;
    }
  }
}

// 분석 데코레이터
export class TrackedUserService extends UserService {
  constructor(
    userRepository: IUserRepository,
    private analytics: IAnalytics
  ) {
    super(userRepository);
  }

  async createUser(userData: CreateUserData): Promise<User> {
    this.analytics.track('user_creation_started', { email: userData.email });
    
    try {
      const user = await super.createUser(userData);
      this.analytics.track('user_creation_completed', { userId: user.id });
      return user;
    } catch (error) {
      this.analytics.track('user_creation_failed', { error: error.message });
      throw error;
    }
  }
}
```

### 팩토리에서 데코레이터 조합
```typescript
// infrastructure/factories/userServiceFactory.ts
export function createUserService(deps: {
  userRepository: IUserRepository;
  logger?: ILogger;
  analytics?: IAnalytics;
}): IUserService {
  let service: IUserService = new UserService(deps.userRepository);
  
  if (deps.logger) {
    service = new LoggedUserService(deps.userRepository, deps.logger);
  }
  
  if (deps.analytics) {
    service = new TrackedUserService(deps.userRepository, deps.analytics);
  }
  
  return service;
}
```

## 피처 간 데이터 조회 아키텍처

### 서비스 계층에서의 조합
```typescript
// features/review/application/ReviewService.ts
export class ReviewService {
  constructor(
    private reviewRepository: IReviewRepository,
    private userService: IUserService // 다른 피처의 서비스 주입
  ) {}

  async getReviewsWithUserInfo(reviewIds: string[]): Promise<ReviewWithUser[]> {
    // 1. 리뷰 데이터 조회
    const reviews = await this.reviewRepository.findByIds(reviewIds);
    
    // 2. 사용자 정보 조회 (다른 피처의 서비스 사용)
    const userIds = reviews.map(review => review.authorId);
    const users = await this.userService.getUsersByIds(userIds);
    
    // 3. 데이터 조합
    return reviews.map(review => ({
      ...review,
      author: users.find(user => user.id === review.authorId)
    }));
  }
}
```

### 예외적 허용: 성능 최적화를 위한 매퍼 위임
```typescript
// features/review/infrastructure/ReviewRepository.ts
import { mapUserRowToUser } from '@/features/user/infrastructure/UserMapper';

export class ReviewRepository implements IReviewRepository {
  async getReviewsWithUsers(): Promise<ReviewWithUser[]> {
    // JOIN으로 한 번의 쿼리로 데이터 조회
    const { data } = await this.supabase
      .from('reviews')
      .select(`
        *,
        users!reviews_author_id_fkey(*)
      `);

    return data.map(row => ({
      ...mapReviewRowToReview(row),
      author: mapUserRowToUser(row.users) // 매핑 책임 위임
    }));
  }
}
```

## 에러 처리

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

export class InvalidEmailError extends DomainError {
  readonly code = 'INVALID_EMAIL';
  readonly statusCode = 400;
  
  constructor(email: string) {
    super(`유효하지 않은 이메일 형식입니다: ${email}`);
  }
}
```

### 에러 처리 미들웨어
```typescript
// infrastructure/middleware/ErrorHandler.ts
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof DomainError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message
      }
    });
  }

  // 시스템 에러
  console.error('Unexpected error:', error);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: '서버 내부 오류가 발생했습니다'
    }
  });
};
```
