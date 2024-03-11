import { GetUserMetricsService } from '../get-user-metric'
import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsService() {
  const checkInsRepository = new PrismaCheckinsRepository()
  const service = new GetUserMetricsService(checkInsRepository)

  return service
}
