import { UsersRepository } from '@/repositories/users-repository'
import { Status, User } from '@prisma/client'

interface FilterUseCaseRequest {
  name?: string
  email?: string
  status?: Status
  cityId?: number
  isVolunteer?: boolean
}

interface FilterUseCaseResponse {
  users: User[]
}

export class FilterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    status = 'ACTIVE',
    cityId,
    isVolunteer,
  }: FilterUseCaseRequest): Promise<FilterUseCaseResponse> {
    const users = await this.usersRepository.findMany({
      name,
      email,
      city_id: cityId,
      is_volunteer: isVolunteer,
      status,
    })

    return {
      users,
    }
  }
}
