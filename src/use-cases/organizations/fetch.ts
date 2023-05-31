import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization, Status } from '@prisma/client'

interface FetchUseCaseRequest {
  name?: string
  status?: Status
  organizationTypeId?: number
  cityId?: number
  page: number
}

interface FetchUseCaseResponse {
  organizations: Organization[]
}

export class FetchUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    organizationTypeId,
    status = 'ACTIVE',
    cityId,
    page,
  }: FetchUseCaseRequest): Promise<FetchUseCaseResponse> {
    const organizations = await this.organizationsRepository.searchMany(
      {
        name,
        status,
        organization_type_id: organizationTypeId,
        city_id: cityId,
      },
      page,
    )

    return {
      organizations,
    }
  }
}
