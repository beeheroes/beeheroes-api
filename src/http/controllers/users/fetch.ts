import { makeFetchUseCase } from '@/use-cases/factories/users/make-fetch-use-case'
import { Role, Status } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchQuerySchema = z.object({
    name: z.string().optional(),
    status: z.nativeEnum(Status).optional(),
    cityId: z.number().optional(),
    role: z.nativeEnum(Role).optional(),
    page: z.coerce.number().min(1).default(1),
  })

  const getUsers = makeFetchUseCase()

  const { name, status, cityId, role, page } = fetchQuerySchema.parse(
    request.query,
  )

  const { users } = await getUsers.execute({
    name,
    status,
    cityId,
    role,
    page,
  })

  return reply.status(200).send({
    users,
  })
}
