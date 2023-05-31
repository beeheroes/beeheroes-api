import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FetchUseCase } from '../../users/fetch'

export function makeFetchUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const fetchUseCase = new FetchUseCase(usersRepository)

  return fetchUseCase
}
