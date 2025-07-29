import { PrismaClient } from '@prisma/client'
import { 
  User, 
  UserRole, 
  VerificationStatus,
  UserId,
  Email,
  MedicalLicenseNumber,
  BusinessNumber,
  IUserRepository
} from '@agently/domain'

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: UserId): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: id.value }
    })

    if (!user) return null

    return this.toDomain(user)
  }

  async findByEmail(email: Email): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.value }
    })

    if (!user) return null

    return this.toDomain(user)
  }

  async findByMedicalLicenseNumber(licenseNumber: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { medicalLicenseNumber: licenseNumber }
    })

    if (!user) return null

    return this.toDomain(user)
  }

  async findByBusinessNumber(businessNumber: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { businessNumber: businessNumber }
    })

    if (!user) return null

    return this.toDomain(user)
  }

  async save(user: User): Promise<void> {
    const data = this.toPersistence(user)
    await this.prisma.user.create({ data })
  }

  async update(user: User): Promise<void> {
    const data = this.toPersistence(user)
    await this.prisma.user.update({
      where: { id: user.id.value },
      data
    })
  }

  async delete(id: UserId): Promise<void> {
    await this.prisma.user.delete({
      where: { id: id.value }
    })
  }

  private toDomain(raw: any): User {
    return User.create({
      id: UserId.create(raw.id),
      email: Email.create(raw.email),
      password: raw.password,
      name: raw.name,
      hospitalName: raw.hospitalName,
      role: raw.role as UserRole,
      verificationStatus: raw.verificationStatus as VerificationStatus,
      medicalLicenseNumber: raw.medicalLicenseNumber ? MedicalLicenseNumber.create(raw.medicalLicenseNumber) : undefined,
      businessNumber: raw.businessNumber ? BusinessNumber.create(raw.businessNumber) : undefined,
      verificationDocuments: raw.verificationDocuments,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    })
  }

  private toPersistence(user: User): any {
    const data = user.toJSON()
    return {
      id: data.id,
      email: data.email,
      password: user.password,
      name: data.name,
      hospitalName: data.hospitalName,
      role: data.role,
      verificationStatus: data.verificationStatus,
      medicalLicenseNumber: data.medicalLicenseNumber,
      businessNumber: data.businessNumber,
      verificationDocuments: data.verificationDocuments,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    }
  }
}