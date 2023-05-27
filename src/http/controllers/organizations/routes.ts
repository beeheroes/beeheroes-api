import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { update } from './update'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/organizations', register)

  app.put('/organizations', { onRequest: [verifyJwt] }, update)
}
