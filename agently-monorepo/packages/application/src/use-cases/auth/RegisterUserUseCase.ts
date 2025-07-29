import {
  User,
  UserRole,
  VerificationStatus,
  Email,
  UserId,
  MedicalLicenseNumber,
  BusinessNumber,
  IUserRepository,
  UserVerificationService
} from '@agently/domain'
import bcrypt from 'bcryptjs'

export interface RegisterUserDTO {
  email: string
  password: string
  name: string
  hospitalName: string
  verificationType: 'medical' | 'business'
  medicalLicenseNumber?: string
  businessNumber?: string
  verificationDocuments: string[]
}

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private verificationService: UserVerificationService
  ) {}

  async execute(dto: RegisterUserDTO): Promise<User> {
    // 이메일 중복 확인
    const email = Email.create(dto.email)
    const existingUser = await this.userRepository.findByEmail(email)
    if (existingUser) {
      throw new Error('Email already exists')
    }

    // 인증 정보 확인
    let medicalLicenseNumber: MedicalLicenseNumber | undefined
    let businessNumber: BusinessNumber | undefined

    if (dto.verificationType === 'medical' && dto.medicalLicenseNumber) {
      medicalLicenseNumber = MedicalLicenseNumber.create(dto.medicalLicenseNumber)
      const existingLicense = await this.userRepository.findByMedicalLicenseNumber(dto.medicalLicenseNumber)
      if (existingLicense) {
        throw new Error('Medical license number already registered')
      }
    } else if (dto.verificationType === 'business' && dto.businessNumber) {
      businessNumber = BusinessNumber.create(dto.businessNumber)
      const existingBusiness = await this.userRepository.findByBusinessNumber(dto.businessNumber)
      if (existingBusiness) {
        throw new Error('Business number already registered')
      }
    } else {
      throw new Error('Invalid verification type or missing verification number')
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(dto.password, 10)

    // 사용자 생성
    const user = User.create({
      id: UserId.create(),
      email,
      password: hashedPassword,
      name: dto.name,
      hospitalName: dto.hospitalName,
      role: UserRole.HOSPITAL_STAFF,
      verificationStatus: VerificationStatus.PENDING,
      medicalLicenseNumber,
      businessNumber,
      verificationDocuments: dto.verificationDocuments,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // 자동 인증 시도 (실제로는 관리자 검토 후 수동 인증)
    let isVerified = false
    if (dto.verificationType === 'medical' && dto.medicalLicenseNumber) {
      isVerified = await this.verificationService.verifyMedicalLicense(dto.medicalLicenseNumber)
    } else if (dto.verificationType === 'business' && dto.businessNumber) {
      isVerified = await this.verificationService.verifyBusinessNumber(dto.businessNumber)
    }

    if (isVerified) {
      user.verify()
    }

    await this.userRepository.save(user)
    return user
  }
}