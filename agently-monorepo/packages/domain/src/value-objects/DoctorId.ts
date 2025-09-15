export class DoctorId {
  private constructor(private readonly _value: string) {
    if (!_value || _value.trim().length === 0) {
      throw new Error('DoctorId cannot be empty')
    }
  }

  static create(value?: string): DoctorId {
    return new DoctorId(value || crypto.randomUUID())
  }

  static fromString(value: string): DoctorId {
    return new DoctorId(value)
  }

  get value(): string {
    return this._value
  }

  equals(other: DoctorId): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}