import { Organization, Role } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { UsersRepository } from '@/repositories/users-repository'

interface UpdateUseCaseRequest {
  id: string
  name?: string
  email?: string
  description?: string
  avatarUrl?: string
  phone?: number
  whatsapp?: number
  address?: string
  cityId?: number
  users?: {
    id: string
    role?: Role
    isActive: boolean
  }[]
  organizationTypeId?: number
}

interface UpdateUseCaseResponse {
  organization: Organization
}

export class UpdateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private organizationRepository: OrganizationsRepository,
  ) {}

  async execute({
    id,
    name,
    email,
    description,
    avatarUrl,
    phone,
    whatsapp,
    address,
    cityId,
    users,
    organizationTypeId,
  }: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const organizationExist = await this.organizationRepository.findById(id)

    if (!organizationExist) {
      throw new ResourceNotFoundError()
    }

    const organization = await this.organizationRepository.update(
      {
        name,
        description,
        avatar_url: avatarUrl,
        phone,
        whatsapp,
        address,
        city_id: cityId,
        email,
        organization_type_id: organizationTypeId,
      },
      id,
    )

    users?.map(async (user) => {
      if (user.isActive) {
        await this.usersRepository.update(
          {
            role: user.role,
            organization_id: organization.id,
          },
          user.id,
        )
      } else {
        await this.usersRepository.update(
          {
            role: Role.MEMBER,
            organization_id: null,
          },
          user.id,
        )
      }
    })

    return {
      organization,
    }
  }
}
