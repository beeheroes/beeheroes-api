import { UsersRepository } from '@/repositories/users-repository'

import { hash } from 'bcryptjs'
import { Role, Status, User } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateUseCaseRequest {
  id: string
  name?: string
  password?: string
  avatarUrl?: string
  cityId?: number
  status?: Status
  role?: Role
  organizationId?: string
}

interface UpdateUseCaseResponse {
  user: User
}

export class UpdateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    name,
    password,
    avatarUrl,
    cityId,
    status,
    role,
    organizationId,
  }: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const password_hash = password ? await hash(password, 6) : undefined

    const userExist = await this.usersRepository.findById(id)

    if (!userExist) {
      throw new ResourceNotFoundError()
    }

    const user = await this.usersRepository.update(
      {
        name,
        password_hash,
        avatar_url: avatarUrl,
        city_id: cityId,
        organization_id: organizationId,
        status,
        role,
      },
      id,
    )

    return {
      user,
    }
  }
}
