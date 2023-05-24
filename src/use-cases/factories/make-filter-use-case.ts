import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FilterUseCase } from '../users/filter'

export function makeFilterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const filterUseCase = new FilterUseCase(usersRepository)

  return filterUseCase
}
