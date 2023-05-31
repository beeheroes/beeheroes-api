import { makeFetchOrganizationsUseCase } from '@/use-cases/factories/organizations/make-fetch-organization-profile-use-case copy'
import { Status } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchQuerySchema = z.object({
    name: z.string().optional(),
    status: z.nativeEnum(Status).optional(),
    cityId: z.number().optional(),
    organizationTypeId: z.number().optional(),
    page: z.coerce.number().min(1).default(1),
  })

  const getOrganizations = makeFetchOrganizationsUseCase()

  const { name, status, cityId, organizationTypeId, page } =
    fetchQuerySchema.parse(request.query)

  const { organizations } = await getOrganizations.execute({
    name,
    status,
    cityId,
    organizationTypeId,
    page,
  })

  return reply.status(200).send({
    organizations,
  })
}
