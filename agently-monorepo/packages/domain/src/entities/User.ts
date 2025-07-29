import { Email } from '../value-objects/Email'
import { UserId } from '../value-objects/UserId'
import { MedicalLicenseNumber } from '../value-objects/MedicalLicenseNumber'
import { BusinessNumber } from '../value-objects/BusinessNumber'

export enum UserRole {
  ADMIN = 'ADMIN',
  HOSPITAL_STAFF = 'HOSPITAL_STAFF'
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED'
}

export interface UserProps {
  id: UserId
  email: Email
  password: string
  name: string
  hospitalName: string
  role: UserRole
  verificationStatus: VerificationStatus
  medicalLicenseNumber?: MedicalLicenseNumber
  businessNumber?: BusinessNumber
  verificationDocuments: string[]
  createdAt: Date
  updatedAt: Date
}

export class User {
  private constructor(private props: UserProps) {}

  static create(props: UserProps): User {
    return new User(props)
  }

  get id(): UserId {
    return this.props.id
  }

  get email(): Email {
    return this.props.email
  }

  get name(): string {
    return this.props.name
  }

  get hospitalName(): string {
    return this.props.hospitalName
  }

  get role(): UserRole {
    return this.props.role
  }

  get verificationStatus(): VerificationStatus {
    return this.props.verificationStatus
  }

  get isVerified(): boolean {
    return this.props.verificationStatus === VerificationStatus.VERIFIED
  }

  verify(): void {
    if (this.props.verificationStatus === VerificationStatus.VERIFIED) {
      throw new Error('User is already verified')
    }
    this.props.verificationStatus = VerificationStatus.VERIFIED
    this.props.updatedAt = new Date()
  }

  reject(): void {
    if (this.props.verificationStatus === VerificationStatus.REJECTED) {
      throw new Error('User is already rejected')
    }
    this.props.verificationStatus = VerificationStatus.REJECTED
    this.props.updatedAt = new Date()
  }

  updatePassword(newPassword: string): void {
    this.props.password = newPassword
    this.props.updatedAt = new Date()
  }

  canWriteReview(): boolean {
    return this.isVerified
  }

  canViewReviews(): boolean {
    return this.isVerified
  }

  get password(): string {
    return this.props.password
  }

  toJSON() {
    return {
      id: this.props.id.value,
      email: this.props.email.value,
      name: this.props.name,
      hospitalName: this.props.hospitalName,
      role: this.props.role,
      verificationStatus: this.props.verificationStatus,
      medicalLicenseNumber: this.props.medicalLicenseNumber?.value,
      businessNumber: this.props.businessNumber?.value,
      verificationDocuments: this.props.verificationDocuments,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt
    }
  }
}