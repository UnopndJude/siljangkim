export class Email {
  private constructor(private readonly _value: string) {}

  static create(value: string): Email {
    if (!value) {
      throw new Error('Email cannot be empty')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      throw new Error('Invalid email format')
    }

    return new Email(value.toLowerCase())
  }

  get value(): string {
    return this._value
  }

  equals(other: Email): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}