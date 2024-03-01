import { describe, expect, it } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register use case', () => {
  it('Should be able to register user', async () => {
    const usersRepository = new InMemoryRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      name: 'luiz',
      email: 'luiz32@prisma.com',
      password: '2423413',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async () => {
    const usersRepository = new InMemoryRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      name: 'luiz',
      email: 'luiz32@prisma.com',
      password: '2423413',
    })

    const isPasswordCorrectlyHashed = await compare(
      '2423413',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not to be able to register with same email twice', async () => {
    const usersRepository = new InMemoryRepository()
    const registerService = new RegisterService(usersRepository)

    const email = 'luiza@gmail.com'

    await registerService.execute({
      name: 'luiz',
      email,
      password: '2423413',
    })

    await expect(() =>
      registerService.execute({
        name: 'luiz',
        email,
        password: '2423413',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
