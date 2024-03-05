import { ICheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsServiceRequest {
  userId: string
}

interface GetUserMetricsServiceResponse {
  checkInsCount: number
}

export class GetUserMetricsService {
  constructor(private checkinRepository: ICheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceResponse> {
    const checkInsCount = await this.checkinRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
