import { makeFilterUseCase } from '@/use-cases/factories/make-filter-use-case'
import { Status } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function filter(request: FastifyRequest, reply: FastifyReply) {
  const filterBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    status: z.nativeEnum(Status).optional(),
    cityId: z.number().optional(),
    isVolunteer: z.boolean().optional(),
  })

  const getUsers = makeFilterUseCase()

  const { name, email, status, cityId, isVolunteer } = filterBodySchema.parse(
    request.params,
  )

  const { users } = await getUsers.execute({
    name,
    email,
    status,
    cityId,
    isVolunteer,
  })

  return reply.status(200).send({
    users,
  })
}
