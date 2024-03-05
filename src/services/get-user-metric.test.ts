import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsService } from './get-user-metric'

let checkinRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsService

describe('Get user metrics use case', () => {
  beforeEach(() => {
    checkinRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsService(checkinRepository)
  })

  it('Should be able to get checkins count from metrics', async () => {
    await checkinRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkinRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
