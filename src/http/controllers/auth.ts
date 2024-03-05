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

    await authenticationService.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      reply.status(400).send({ message: error.message })
    }

    throw error
  }
  return reply.status(200).send()
}
