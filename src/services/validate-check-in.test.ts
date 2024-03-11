import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInService } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkinRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService

describe('Validate Check in use case', () => {
  beforeEach(() => {
    checkinRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInService(checkinRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to validate the check in', async () => {
    const createdCheckIn = await checkinRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkinRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('Should not be able to validate an inexistent check in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not to be able to validate the check in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 12, 20))

    const createdCheckIn = await checkinRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMiliseconds = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMiliseconds)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
