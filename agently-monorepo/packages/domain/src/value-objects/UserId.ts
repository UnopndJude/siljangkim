import { v4 as uuidv4 } from 'uuid'

export class UserId {
  private constructor(private readonly _value: string) {}

  static create(value?: string): UserId {
    if (value) {
      if (!value.match(/^[0-9a-fA-F-]{36}$/)) {
        throw new Error('Invalid UserId format')
      }
      return new UserId(value)
    }
    return new UserId(uuidv4())
  }

  get value(): string {
    return this._value
  }

  equals(other: UserId): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}