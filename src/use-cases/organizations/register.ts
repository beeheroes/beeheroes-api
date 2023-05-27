import { Organization, Role } from '@prisma/client'
import { OrganizationRepository } from '@/repositories/organization-repository'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exist-error'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  cnpj: string
  description?: string
  avatarUrl?: string
  phone?: number
  whatsapp?: number
  address?: string
  cityId: number
  userId: string
  organizationTypeId: number
}

interface RegisterUseCaseResponse {
  organization: Organization
}

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private organizationRepository: OrganizationRepository,
  ) {}

  async execute({
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
    userId,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userExist = await this.usersRepository.findById(userId)

    if (!userExist) {
      throw new ResourceNotFoundError()
    }

    const organizationAlreadyExists =
      await this.organizationRepository.findByCnpj(cnpj)

    console.log('organizationAlreadyExists', organizationAlreadyExists)

    if (organizationAlreadyExists) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationRepository.create({
      name,
      email,
      cnpj,
      description,
      phone,
      whatsapp,
      address,
      avatar_url: avatarUrl,
      city_id: cityId,
      organization_type_id: organizationTypeId,
    })

    await this.usersRepository.update(
      {
        role: Role.ADMIN,
        organization_id: organization.id,
      },
      userId,
    )

    return {
      organization,
    }
  }
}
