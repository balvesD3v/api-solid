import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNeabyGymsService } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new FetchNeabyGymsService(gymsRepository)

  return service
}
