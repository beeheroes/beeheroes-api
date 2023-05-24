import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findMany(data: Prisma.UserUncheckedCreateInput): Promise<User[]> {
    const user = await prisma.user.findMany({
      where: {
        id: data.id,
        name: data.name,
        status: data.status,
        city_id: data.city_id,
        is_volunteer: data.is_volunteer,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async update(
    data: Prisma.UserUncheckedUpdateInput,
    id: string,
  ): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    })

    return user
  }
}
