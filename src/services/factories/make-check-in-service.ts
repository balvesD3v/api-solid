import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInService } from '../check-in'
import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCheckInService() {
  const checkInsRepository = new PrismaCheckinsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const service = new CheckInService(checkInsRepository, gymsRepository)

  return service
}
