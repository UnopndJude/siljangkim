import { v4 as uuidv4 } from 'uuid'

export class CoordinatorId {
  private constructor(private readonly _value: string) {}

  static create(value?: string): CoordinatorId {
    if (value) {
      if (!value.match(/^[0-9a-fA-F-]{36}$/)) {
        throw new Error('Invalid CoordinatorId format')
      }
      return new CoordinatorId(value)
    }
    return new CoordinatorId(uuidv4())
  }

  get value(): string {
    return this._value
  }

  equals(other: CoordinatorId): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}