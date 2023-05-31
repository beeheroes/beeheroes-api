import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organization-repository'
import { GetOrganizationProfileUseCase } from '@/use-cases/organizations/get-organization-profile'

export function makeGetOrganizationProfileUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new GetOrganizationProfileUseCase(organizationsRepository)

  return useCase
}
