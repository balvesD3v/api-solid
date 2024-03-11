import { FetchUserCheckInHistoryService } from '../fetch-user-check-in-history'
import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchCheckInHistoryService() {
  const checkInsRepository = new PrismaCheckinsRepository()
  const service = new FetchUserCheckInHistoryService(checkInsRepository)

  return service
}
