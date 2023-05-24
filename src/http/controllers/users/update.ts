import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exist-error'
import { makeUpdateUseCase } from '@/use-cases/factories/make-update-use-case'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { Status } from '@prisma/client'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    isVolunteer: z.boolean().optional(),
    cityId: z.number().optional(),
    avatarUrl: z.string().optional(),
    status: z.nativeEnum(Status).optional(),
  })

  const { name, email, password, isVolunteer, cityId, avatarUrl, status } =
    updateBodySchema.parse(request.body)

  try {
    const updateUseCase = makeUpdateUseCase()

    await request.jwtVerify()

    const getUserProfile = makeGetUserProfileUseCase()

    const { user } = await getUserProfile.execute({
      userId: request.user.sub,
    })

    await updateUseCase.execute({
      name,
      email,
      password,
      isVolunteer,
      cityId,
      avatarUrl,
      status,
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
