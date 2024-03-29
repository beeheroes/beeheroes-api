import { Volunteer } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { VolunteersRepository } from '@/repositories/volunteers-repository'

interface UpdateUseCaseRequest {
  id: string
  description?: string
  title?: string
  occupationAreaId?: number
}

interface UpdateUseCaseResponse {
  volunteer: Volunteer
}

export class UpdateUseCase {
  constructor(private volunteerRepository: VolunteersRepository) {}

  async execute({
    id,
    description,
    title,
    occupationAreaId,
  }: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const volunteerExist = await this.volunteerRepository.findById(id)

    if (!volunteerExist) {
      throw new ResourceNotFoundError()
    }

    const volunteer = await this.volunteerRepository.update(
      {
        description,
        title,
        occupation_id: occupationAreaId,
      },
      id,
    )

    return {
      volunteer,
    }
  }
}
