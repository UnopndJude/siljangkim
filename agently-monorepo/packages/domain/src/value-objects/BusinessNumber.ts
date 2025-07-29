export class BusinessNumber {
  private constructor(private readonly _value: string) {}

  static create(value: string): BusinessNumber {
    if (!value) {
      throw new Error('Business number cannot be empty')
    }
    
    // 사업자번호 형식 검증 (10자리 숫자)
    const cleaned = value.replace(/-/g, '')
    if (!cleaned.match(/^\d{10}$/)) {
      throw new Error('Invalid business number format')
    }

    // 사업자번호 유효성 검증 (체크섬)
    if (!this.isValidBusinessNumber(cleaned)) {
      throw new Error('Invalid business number')
    }

    return new BusinessNumber(cleaned)
  }

  private static isValidBusinessNumber(number: string): boolean {
    const weights = [1, 3, 7, 1, 3, 7, 1, 3, 5]
    let sum = 0

    for (let i = 0; i < 9; i++) {
      sum += parseInt(number[i]) * weights[i]
    }

    sum += Math.floor((parseInt(number[8]) * 5) / 10)
    const checkDigit = (10 - (sum % 10)) % 10

    return checkDigit === parseInt(number[9])
  }

  get value(): string {
    return this._value
  }

  get formatted(): string {
    return `${this._value.slice(0, 3)}-${this._value.slice(3, 5)}-${this._value.slice(5)}`
  }

  equals(other: BusinessNumber): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this.formatted
  }
}