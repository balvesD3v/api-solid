import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create gym use case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymRepository)
  })

  it('Should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'gym-02',
      description: null,
      latitude: -5.9417785,
      longitude: -35.2510578,
      phone: null,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
