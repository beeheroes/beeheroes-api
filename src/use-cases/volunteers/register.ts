import { UsersRepository } from '@/repositories/users-repository'
import { VolunteerRepository } from '@/repositories/volunteer-repository'
import { Volunteer } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface RegisterUseCaseRequest {
  id: string
  description?: string
  role?: string
  occupationAreaId: number
}

interface RegisterUseCaseResponse {
  volunteer: Volunteer
}

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private volunteerRepository: VolunteerRepository,
  ) {}

  async execute({
    id,
    description,
    role,
    occupationAreaId,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userExist = await this.usersRepository.findById(id)

    if (!userExist) {
      throw new ResourceNotFoundError()
    }

    const volunteer = await this.volunteerRepository.create(
      {
        id,
        user_id: id,
        description,
        role,
        occupation_id: occupationAreaId,
      },
      id,
    )

    return {
      volunteer,
    }
  }
}
