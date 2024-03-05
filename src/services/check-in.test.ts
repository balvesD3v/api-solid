import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInService } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkinRepository: InMemoryCheckInsRepository
let gymRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check in use case', () => {
  beforeEach(() => {
    checkinRepository = new InMemoryCheckInsRepository()
    gymRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkinRepository, gymRepository)

    gymRepository.create({
      id: 'gym-01',
      title: 'gym',
      description: '',
      latitude: -5.9494819,
      longitude: -35.2525748,
      phone: '',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-1',
      userLatitude: -5.9494819,
      userLongitude: -35.2525748,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in twice in same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 9, 0, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-1',
      userLatitude: -5.9494819,
      userLongitude: -35.2525748,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-1',
        userLatitude: -5.9494819,
        userLongitude: -35.2525748,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('Should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 9, 0, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-1',
      userLatitude: -5.9494819,
      userLongitude: -35.2525748,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 9, 0, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-1',
      userLatitude: -5.9494819,
      userLongitude: -35.2525748,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should be able to check in on distant gym', async () => {
    gymRepository.items.push({
      id: 'gym-02',
      title: 'gym',
      description: '',
      latitude: new Decimal(-5.9417785),
      longitude: new Decimal(-35.2510578),
      phone: '',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-1',
        userLatitude: -5.9494819,
        userLongitude: -35.2525748,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
