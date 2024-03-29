import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'
import { update } from './update'
import { find } from './find'
import { fetch } from './fetch'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.put('/users', { onRequest: [verifyJwt] }, update)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJwt] }, profile)
  app.get('/user/:id', find)
  app.get('/users/*', fetch)
}
