import { UsersRepository } from '@/repositories/users-repository'
import { City, Role } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export interface Profile {
  name: string
  city: City
  email: string
  is_volunteer: boolean
  id: string
  role: Role

  avatar_url: string

  volunteer: true
}
interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: Profile
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
