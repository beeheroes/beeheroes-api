import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const findParamsSchema = z.object({
    id: z.string(),
  })

  const getUserProfile = makeGetUserProfileUseCase()

  const { id } = findParamsSchema.parse(request.params)

  const { user } = await getUserProfile.execute({
    userId: id,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
