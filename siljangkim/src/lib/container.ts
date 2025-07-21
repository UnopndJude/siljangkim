import { PrismaClient } from '@prisma/client'
import { PrismaUserRepository } from '../infrastructure/repositories/PrismaUserRepository'
import { JWTTokenService } from '../infrastructure/services/TokenService'
import { UserVerificationService, IVerificationService } from '../domain/services/UserVerificationService'
import { ReviewAccessService } from '../domain/services/ReviewAccessService'
import { RegisterUserUseCase } from '../application/use-cases/auth/RegisterUserUseCase'
import { LoginUserUseCase } from '../application/use-cases/auth/LoginUserUseCase'
import { MedicalLicenseNumber } from '../domain/value-objects/MedicalLicenseNumber'
import { BusinessNumber } from '../domain/value-objects/BusinessNumber'

// Mock verification service (실제로는 외부 API 연동)
class MockVerificationService implements IVerificationService {
  async verifyMedicalLicense(licenseNumber: MedicalLicenseNumber): Promise<boolean> {
    // 실제로는 의사면허 검증 API 호출
    return true
  }

  async verifyBusinessNumber(businessNumber: BusinessNumber): Promise<boolean> {
    // 실제로는 사업자번호 검증 API 호출
    return true
  }
}

// Singleton instances
let prisma: PrismaClient
let container: Container

class Container {
  public prisma: PrismaClient
  public userRepository: PrismaUserRepository
  public tokenService: JWTTokenService
  public verificationService: UserVerificationService
  public reviewAccessService: ReviewAccessService

  // Use cases
  public registerUserUseCase: RegisterUserUseCase
  public loginUserUseCase: LoginUserUseCase

  constructor() {
    // Infrastructure
    this.prisma = new PrismaClient()
    this.userRepository = new PrismaUserRepository(this.prisma)
    this.tokenService = new JWTTokenService(process.env.JWT_SECRET || 'secret')
    
    // Domain services
    const mockVerificationService = new MockVerificationService()
    this.verificationService = new UserVerificationService(mockVerificationService)
    this.reviewAccessService = new ReviewAccessService(null as any) // TODO: Add review repository

    // Application services
    this.registerUserUseCase = new RegisterUserUseCase(
      this.userRepository,
      this.verificationService
    )
    this.loginUserUseCase = new LoginUserUseCase(
      this.userRepository,
      this.tokenService
    )
  }
}

export function getContainer(): Container {
  if (!container) {
    container = new Container()
  }
  return container
}