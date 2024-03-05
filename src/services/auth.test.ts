import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticationService } from './auth'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUserRepository
let sut: AuthenticationService

describe('Auth use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new AuthenticationService(usersRepository)
  })

  it('Should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'user2@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'user2@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'user1@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'user2@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'user1@example.com',
        password: '123456123 ',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
