import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeUpdateUseCase } from '@/use-cases/factories/volunteers/make-update-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    description: z.string().optional(),
    title: z.string().optional(),
    occupationAreaId: z.number().optional(),
  })

  try {
    const updateUseCase = makeUpdateUseCase()

    await request.jwtVerify()

    const { description, title, occupationAreaId } = updateBodySchema.parse(
      request.body,
    )

    await updateUseCase.execute({
      description,
      title,
      occupationAreaId,
      id: request.user.sub,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
