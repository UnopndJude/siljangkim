import { v4 as uuidv4 } from 'uuid'

export class ReviewId {
  private constructor(private readonly _value: string) {}

  static create(value?: string): ReviewId {
    if (value) {
      if (!value.match(/^[0-9a-fA-F-]{36}$/)) {
        throw new Error('Invalid ReviewId format')
      }
      return new ReviewId(value)
    }
    return new ReviewId(uuidv4())
  }

  get value(): string {
    return this._value
  }

  equals(other: ReviewId): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}