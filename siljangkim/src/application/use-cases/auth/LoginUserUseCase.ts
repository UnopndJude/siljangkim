import { User } from '../../../domain/entities/User'
import { Email } from '../../../domain/value-objects/Email'
import { IUserRepository } from '../../../domain/repositories/IUserRepository'
import bcrypt from 'bcryptjs'

export interface LoginUserDTO {
  email: string
  password: string
}

export interface LoginResult {
  user: User
  token: string
}

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: { generateToken(userId: string): string }
  ) {}

  async execute(dto: LoginUserDTO): Promise<LoginResult> {
    const email = Email.create(dto.email)
    const user = await this.userRepository.findByEmail(email)
    
    if (!user) {
      throw new Error('Invalid email or password')
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password)
    if (!isPasswordValid) {
      throw new Error('Invalid email or password')
    }

    const token = this.tokenService.generateToken(user.id.value)

    return {
      user,
      token
    }
  }
}