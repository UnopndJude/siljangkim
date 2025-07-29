export class PhoneNumber {
  private constructor(private readonly _value: string) {}

  static create(value: string): PhoneNumber {
    if (!value) {
      throw new Error('Phone number cannot be empty')
    }
    
    // 한국 전화번호 형식 검증
    const cleaned = value.replace(/[-\s]/g, '')
    if (!cleaned.match(/^(01[016789]\d{7,8}|0[2-6]\d{7,9})$/)) {
      throw new Error('Invalid phone number format')
    }

    return new PhoneNumber(cleaned)
  }

  get value(): string {
    return this._value
  }

  get formatted(): string {
    if (this._value.startsWith('01')) {
      // 휴대폰 번호
      return this._value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
    } else {
      // 일반 전화번호
      if (this._value.startsWith('02')) {
        // 서울
        return this._value.replace(/(\d{2})(\d{3,4})(\d{4})/, '$1-$2-$3')
      } else {
        // 기타 지역
        return this._value.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3')
      }
    }
  }

  equals(other: PhoneNumber): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this.formatted
  }
}