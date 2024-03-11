import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/midldlewares/verify-jwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create-gym'
import { verifyUserRole } from '@/http/midldlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
