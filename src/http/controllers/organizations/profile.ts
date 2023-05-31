import { makeGetOrganizationProfileUseCase } from '@/use-cases/factories/organizations/make-get-organization-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profileQuerySchema = z.object({
    id: z.string(),
  })

  const getOrganizationProfile = makeGetOrganizationProfileUseCase()

  const { id: organizationId } = profileQuerySchema.parse(request.params)

  const { organization } = await getOrganizationProfile.execute({
    organizationId,
  })

  return reply.status(200).send({
    organization,
  })
}
