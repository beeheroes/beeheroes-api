import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaVolunteerRepository } from '@/repositories/prisma/prisma-volunteer-repository'
import { RegisterUseCase } from '@/use-cases/volunteers/register'

export function makeRegisterUseCase() {
  const volunteerRepository = new PrismaVolunteerRepository()
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(
    usersRepository,
    volunteerRepository,
  )

  return registerUseCase
}
