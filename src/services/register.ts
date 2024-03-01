import { IUsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

export interface IRegisterUserService {
  name: string
  email: string
  password: string
}

interface RegisterUserServiceResponse {
  user: User
}

export class RegisterService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: IRegisterUserService): Promise<RegisterUserServiceResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    })

    return { user }
  }
}
