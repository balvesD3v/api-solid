import { IGymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

export interface FetchNeabyGymsServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNeabyGymsServiceResponse {
  gyms: Gym[]
}

export class FetchNeabyGymsService {
  constructor(private readonly gymsRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNeabyGymsServiceRequest): Promise<FetchNeabyGymsServiceResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
