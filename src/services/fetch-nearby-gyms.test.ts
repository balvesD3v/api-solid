import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNeabyGymsService } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNeabyGymsService

describe('Fetch Nearby Gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNeabyGymsService(gymsRepository)
  })

  it('Should be able to fetch for nearby gyms', async () => {
    await gymsRepository.create({
      title: 'near gym',
      description: null,
      latitude: -5.9494819,
      longitude: -35.2525748,
      phone: null,
    })

    await gymsRepository.create({
      title: 'far gym',
      description: null,
      latitude: -5.141185,
      longitude: -36.50612,
      phone: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -5.9494819,
      userLongitude: -35.2525748,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'near gym' })])
  })
})
