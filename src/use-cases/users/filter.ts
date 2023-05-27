import { UsersRepository } from '@/repositories/users-repository'
import { Role, Status, User } from '@prisma/client'

interface FilterUseCaseRequest {
  name?: string
  status?: Status
  role?: Role
  cityId?: number
  page: number
}

interface FilterUseCaseResponse {
  users: User[]
}

export class FilterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    role,
    status = 'ACTIVE',
    cityId,
    page,
  }: FilterUseCaseRequest): Promise<FilterUseCaseResponse> {
    const users = await this.usersRepository.searchMany(
      {
        name,
        status,
        role,
        city_id: cityId,
      },
      page,
    )

    return {
      users,
    }
  }
}
