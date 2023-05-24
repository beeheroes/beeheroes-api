import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exist-error'
import { makeRegisterUseCase } from '@/use-cases/factories/volunteers/make-register-use-case'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/users/make-get-user-profile-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    description: z.string().optional(),
    role: z.string().optional(),
    occupationAreaId: z.number(),
  })

  const { description, role, occupationAreaId } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = makeRegisterUseCase()

    await request.jwtVerify()

    const getUserProfile = makeGetUserProfileUseCase()

    const { user } = await getUserProfile.execute({
      userId: request.user.sub,
    })

    await registerUseCase.execute({
      description,
      role,
      occupationAreaId,
      id: user.id,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
