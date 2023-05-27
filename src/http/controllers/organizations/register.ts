import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeRegisterUseCase } from '@/use-cases/factories/organizations/make-register-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cnpj: z.string().min(14),
    description: z.string().optional(),
    cityId: z.number(),
    phone: z.number().optional(),
    whatsapp: z.number().optional(),
    address: z.string().optional(),
    avatarUrl: z.string().optional(),
    organizationTypeId: z.number(),
  })

  const {
    name,
    email,
    cnpj,
    description,
    avatarUrl,
    phone,
    whatsapp,
    address,
    cityId,
    organizationTypeId,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await request.jwtVerify()

    await registerUseCase.execute({
      name,
      email,
      cnpj,
      description,
      avatarUrl,
      phone,
      whatsapp,
      address,
      cityId,
      organizationTypeId,
      userId: request.user.sub,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
