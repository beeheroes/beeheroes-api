import { UsersRepository } from '@/repositories/users-repository'
import { VolunteersRepository } from '@/repositories/volunteers-repository'
import { Role, Volunteer } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface RegisterUseCaseRequest {
  id: string
  description?: string
  title?: string
  occupationAreaId: number
}

interface RegisterUseCaseResponse {
  volunteer: Volunteer
}

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private volunteerRepository: VolunteersRepository,
  ) {}

  async execute({
    id,
    description,
    title,
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
        title,
        occupation_id: occupationAreaId,
      },
      id,
    )

    await this.usersRepository.update(
      {
        role: Role.VOLUNTEER,
      },
      id,
    )

    return {
      volunteer,
    }
  }
}
