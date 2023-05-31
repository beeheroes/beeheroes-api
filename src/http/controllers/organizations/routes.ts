import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

import { register } from './register'
import { update } from './update'
import { profile } from './profile'
import { fetch } from './fetch'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/organizations', { onRequest: [verifyJwt] }, register)

  app.put(
    '/organizations/:id',
    { onRequest: [verifyUserRole('ADMIN')] },
    update,
  )

  app.get('/organization/:id', profile)
  app.get('/organizations/*', fetch)
}
