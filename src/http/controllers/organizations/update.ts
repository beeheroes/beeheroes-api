import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateUseCase } from '@/use-cases/factories/organizations/make-update-use-case'
import { Role } from '@prisma/client'
import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exist-error'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().optional(),
    description: z.string().optional(),
    cityId: z.number().optional(),
    phone: z.number().optional(),
    whatsapp: z.number().optional(),
    address: z.string().optional(),
    avatarUrl: z.string().optional(),
    organizationTypeId: z.number().optional(),
    users: z
      .array(
        z.object({
          id: z.string(),
          role: z.nativeEnum(Role).optional(),
          isActive: z.boolean(),
        }),
      )
      .optional(),
  })

  const {
    id,
    name,
    email,
    description,
    avatarUrl,
    phone,
    whatsapp,
    address,
    cityId,
    organizationTypeId,
    users,
  } = updateBodySchema.parse(request.body)

  try {
    const updateUseCase = makeUpdateUseCase()

    await request.jwtVerify()

    await updateUseCase.execute({
      id,
      name,
      email,
      description,
      avatarUrl,
      phone,
      whatsapp,
      address,
      cityId,
      organizationTypeId,
      users,
    })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
