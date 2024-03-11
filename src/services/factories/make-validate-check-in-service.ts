import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInService } from '../validate-check-in'

export function makeValidateCheckinService() {
  const checkInsRepository = new PrismaCheckinsRepository()
  const service = new ValidateCheckInService(checkInsRepository)

  return service
}
