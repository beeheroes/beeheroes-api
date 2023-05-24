import { FastifyInstance } from 'fastify'
import { register } from './register'
import { update } from './update'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function volunteerRoutes(app: FastifyInstance) {
  app.post('/volunteers', { onRequest: [verifyJwt] }, register)

  app.put('/volunteers', { onRequest: [verifyJwt] }, update)
}
