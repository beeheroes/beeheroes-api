import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organization-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { RegisterUseCase } from '@/use-cases/organizations/register'

export function makeRegisterUseCase() {
  const organizationRepository = new PrismaOrganizationsRepository()
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(
    usersRepository,
    organizationRepository,
  )

  return registerUseCase
}
