import { FastifyInstance } from 'fastify'
import { register } from './register'
import { auth } from './auth'
import { profile } from './profile'
import { verifyJwt } from '@/http/midldlewares/verify-jwt'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', auth)
  app.patch('/token/refresh', refresh)
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
