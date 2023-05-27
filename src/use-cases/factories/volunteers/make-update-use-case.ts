import { PrismaVolunteerRepository } from '@/repositories/prisma/prisma-volunteer-repository'
import { UpdateUseCase } from '@/use-cases/volunteers/update'

export function makeUpdateUseCase() {
  const volunteerRepository = new PrismaVolunteerRepository()
  const updateUseCase = new UpdateUseCase(volunteerRepository)

  return updateUseCase
}
