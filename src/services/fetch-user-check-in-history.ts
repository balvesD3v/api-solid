import { CheckIn } from '@prisma/client'
import { ICheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUserCheckInHistoryServiceRequest {
  userId: string
  page: number
}

interface FetchUserCheckInHistoryServiceResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryService {
  constructor(private checkinRepository: ICheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInHistoryServiceRequest): Promise<FetchUserCheckInHistoryServiceResponse> {
    const checkIns = await this.checkinRepository.findManyByUserId(userId, page)

    return {
      checkIns,
    }
  }
}
