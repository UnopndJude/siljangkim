export class Rating {
  private constructor(private readonly _value: number) {}

  static create(value: number): Rating {
    if (value < 1 || value > 5) {
      throw new Error('Rating must be between 1 and 5')
    }
    if (!Number.isInteger(value)) {
      throw new Error('Rating must be an integer')
    }
    return new Rating(value)
  }

  get value(): number {
    return this._value
  }

  equals(other: Rating): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value.toString()
  }
}