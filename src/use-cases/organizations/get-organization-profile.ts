import { ProfileOrganization } from '@/@types/ProfileOrganization'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { OrganizationsRepository } from '@/repositories/organizations-repository'

interface GetOrganizationProfileUseCaseRequest {
  organizationId: string
}

interface GetOrganizationProfileUseCaseResponse {
  organization: ProfileOrganization
}

export class GetOrganizationProfileUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    organizationId,
  }: GetOrganizationProfileUseCaseRequest): Promise<GetOrganizationProfileUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(
      organizationId,
    )

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    return {
      organization,
    }
  }
}
