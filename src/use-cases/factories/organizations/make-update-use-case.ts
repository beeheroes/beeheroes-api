import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organization-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { UpdateUseCase } from '@/use-cases/organizations/update'

export function makeUpdateUseCase() {
  const organizationRepository = new PrismaOrganizationsRepository()
  const usersRepository = new PrismaUsersRepository()
  const updateUseCase = new UpdateUseCase(
    usersRepository,
    organizationRepository,
  )

  return updateUseCase
}
