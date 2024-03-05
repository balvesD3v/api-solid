import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticationService } from '../auth'

export function makeAuthService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticationService = new AuthenticationService(prismaUsersRepository)

  return authenticationService
}
