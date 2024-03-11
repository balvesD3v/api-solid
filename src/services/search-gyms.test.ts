import { describe, expect, it, beforeEach } from 'vitest'
import { SearchGymsService } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsService

describe('Fetch user Check in history use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(gymsRepository)
  })

  it('Should be able to fetch for gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript gym',
      description: null,
      latitude: -5.9417785,
      longitude: -35.2510578,
      phone: null,
    })

    await gymsRepository.create({
      title: 'Typescript gyms',
      description: null,
      latitude: -5.9417785,
      longitude: -35.2510578,
      phone: null,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript gym' })])
  })

  it('Should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript gym ${i}`,
        description: null,
        latitude: -5.9417785,
        longitude: -35.2510578,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript gym 21' }),
      expect.objectContaining({ title: 'Javascript gym 22' }),
    ])
  })
})
