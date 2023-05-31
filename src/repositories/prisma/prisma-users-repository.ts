import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { UserSearchManyInput } from '@/@types/UserSearchManyInput'

export class PrismaUsersRepository implements UsersRepository {
  async searchMany(data: UserSearchManyInput, page: number): Promise<User[]> {
    const { name, city_id, status, role } = data

    console.log(name)
    const user = await prisma.user.findMany({
      where: {
        AND: [
          { name: { contains: name, mode: 'insensitive' } },
          { city_id },
          { role },
          { status },
        ],
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      select: {
        name: true,
        city: true,
        email: true,
        id: true,
        role: true,

        avatar_url: true,

        volunteer: true,
        organization: true,
      },
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
