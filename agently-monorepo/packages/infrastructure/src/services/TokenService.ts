import jwt from 'jsonwebtoken'

export interface ITokenService {
  generateToken(userId: string): string
  verifyToken(token: string): string | null
}

export class JWTTokenService implements ITokenService {
  constructor(private secret: string) {}

  generateToken(userId: string): string {
    return jwt.sign({ userId }, this.secret, { expiresIn: '7d' })
  }

  verifyToken(token: string): string | null {
    try {
      const decoded = jwt.verify(token, this.secret) as { userId: string }
      return decoded.userId
    } catch (error) {
      return null
    }
  }
}