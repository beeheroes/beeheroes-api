import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exist-error'

import { makeUpdateUseCase } from '@/use-cases/factories/volunteers/make-update-use-case'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/users/make-get-user-profile-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    description: z.string().optional(),
    role: z.string().optional(),
    occupationAreaId: z.number().optional(),
  })

  try {
    const updateUseCase = makeUpdateUseCase()

    await request.jwtVerify()

    const getUserProfile = makeGetUserProfileUseCase()

    const { user } = await getUserProfile.execute({
      userId: request.user.sub,
    })
    const { description, role, occupationAreaId } = updateBodySchema.parse(
      request.body,
    )

    console.log('BODY', request.body)

    await updateUseCase.execute({
      description,
      role,
      occupationAreaId,
      id: user.id,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof UserAlreadyExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
