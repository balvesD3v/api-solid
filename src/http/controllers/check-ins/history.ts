import { makeFetchCheckInHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryBodyQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })
  const { page } = checkInHistoryBodyQuerySchema.parse(request.query)

  const fetchUserCheckInHistory = makeFetchCheckInHistoryService()

  const { checkIns } = await fetchUserCheckInHistory.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkIns,
  })
}
