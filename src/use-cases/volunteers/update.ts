import { Volunteer } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { VolunteerRepository } from '@/repositories/volunteer-repository'
import { UsersRepository } from '@/repositories/users-repository'

interface UpdateUseCaseRequest {
  id: string
  description?: string
  role?: string
  occupationAreaId?: number
}

interface UpdateUseCaseResponse {
  volunteer: Volunteer
}

export class UpdateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private volunteerRepository: VolunteerRepository,
  ) {}

  async execute({
    id,
    description,
    role,
    occupationAreaId,
  }: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const userExist = await this.usersRepository.findById(id)

    if (!userExist) {
      throw new ResourceNotFoundError()
    }

    const volunteer = await this.volunteerRepository.update(
      {
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
