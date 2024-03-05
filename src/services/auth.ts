import { IUsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthServiceRequest {
  email: string
  password: string
}

interface AuthServiceResponse {
  user: User
}

export class AuthenticationService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: AuthServiceRequest): Promise<AuthServiceResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
