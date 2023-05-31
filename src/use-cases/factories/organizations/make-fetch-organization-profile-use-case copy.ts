import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organization-repository'
import { FetchUseCase } from '@/use-cases/organizations/fetch'

export function makeFetchOrganizationsUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new FetchUseCase(organizationsRepository)

  return useCase
}
