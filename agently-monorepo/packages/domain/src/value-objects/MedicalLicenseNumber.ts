export class MedicalLicenseNumber {
  private constructor(private readonly _value: string) {}

  static create(value: string): MedicalLicenseNumber {
    if (!value) {
      throw new Error('Medical license number cannot be empty')
    }
    
    // 의사면허번호 형식 검증 (숫자 5-6자리)
    if (!value.match(/^\d{5,6}$/)) {
      throw new Error('Invalid medical license number format')
    }

    return new MedicalLicenseNumber(value)
  }

  get value(): string {
    return this._value
  }

  equals(other: MedicalLicenseNumber): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}