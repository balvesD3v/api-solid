import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInHistoryService } from './fetch-user-check-in-history'

let checkinRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInHistoryService

describe('Fetch user Check in history use case', () => {
  beforeEach(() => {
    checkinRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInHistoryService(checkinRepository)
  })

  it('Should be able to fetch check in history', async () => {
    await checkinRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkinRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('Should be able to fetch paginated user check in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkinRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
