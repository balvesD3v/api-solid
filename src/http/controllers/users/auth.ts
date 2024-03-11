import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthService } from '@/services/factories/make-auth-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function auth(request: FastifyRequest, reply: FastifyReply) {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { email, password } = authBodySchema.parse(request.body)

  try {
    const authenticationService = makeAuthService()

    const { user } = await authenticationService.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
