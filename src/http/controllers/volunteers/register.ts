import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from '@/use-cases/factories/volunteers/make-register-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    description: z.string().optional(),
    title: z.string().optional(),
    occupationAreaId: z.number(),
  })

  const { description, title, occupationAreaId } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = makeRegisterUseCase()

    await request.jwtVerify()

    await registerUseCase.execute({
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
