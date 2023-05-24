import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { PrismaVolunteerRepository } from '@/repositories/prisma/prisma-volunteer-repository'

import { UpdateUseCase } from '@/use-cases/volunteers/update'

export function makeUpdateUseCase() {
  const volunteerRepository = new PrismaVolunteerRepository()
  const usersRepository = new PrismaUsersRepository()
  const updateUseCase = new UpdateUseCase(usersRepository, volunteerRepository)

  return updateUseCase
}
