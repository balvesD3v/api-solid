import { IGymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

export interface SearchGymsServiceRequest {
  query: string
  page: number
}

interface SearchGymsServiceResponse {
  gyms: Gym[]
}

export class SearchGymsService {
  constructor(private readonly gymsRepository: IGymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsServiceRequest): Promise<SearchGymsServiceResponse> {
    const gyms = await this.gymsRepository.searchManyByQuery(query, page)

    return {
      gyms,
    }
  }
}
