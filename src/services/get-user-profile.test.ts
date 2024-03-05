import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileService } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUserRepository
let sut: GetUserProfileService

describe('Get user profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new GetUserProfileService(usersRepository)
  })

  it('Should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'user@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('Should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'Non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
