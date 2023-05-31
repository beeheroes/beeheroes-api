import { UsersRepository } from '@/repositories/users-repository'
import { Role, Status, User } from '@prisma/client'

interface FetchUseCaseRequest {
  name?: string
  status?: Status
  role?: Role
  cityId?: number
  page: number
}

interface FetchUseCaseResponse {
  users: User[]
}

export class FetchUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    role,
    status = 'ACTIVE',
    cityId,
    page,
  }: FetchUseCaseRequest): Promise<FetchUseCaseResponse> {
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
