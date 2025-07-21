import { User } from '../entities/User'
import { UserId } from '../value-objects/UserId'
import { Email } from '../value-objects/Email'

export interface IUserRepository {
  findById(id: UserId): Promise<User | null>
  findByEmail(email: Email): Promise<User | null>
  findByMedicalLicenseNumber(licenseNumber: string): Promise<User | null>
  findByBusinessNumber(businessNumber: string): Promise<User | null>
  save(user: User): Promise<void>
  update(user: User): Promise<void>
  delete(id: UserId): Promise<void>
}