import { MedicalLicenseNumber } from '../value-objects/MedicalLicenseNumber'
import { BusinessNumber } from '../value-objects/BusinessNumber'

export interface IVerificationService {
  verifyMedicalLicense(licenseNumber: MedicalLicenseNumber): Promise<boolean>
  verifyBusinessNumber(businessNumber: BusinessNumber): Promise<boolean>
}

export class UserVerificationService {
  constructor(private verificationService: IVerificationService) {}

  async verifyMedicalLicense(licenseNumber: string): Promise<boolean> {
    try {
      const license = MedicalLicenseNumber.create(licenseNumber)
      return await this.verificationService.verifyMedicalLicense(license)
    } catch (error) {
      return false
    }
  }

  async verifyBusinessNumber(businessNumber: string): Promise<boolean> {
    try {
      const business = BusinessNumber.create(businessNumber)
      return await this.verificationService.verifyBusinessNumber(business)
    } catch (error) {
      return false
    }
  }
}