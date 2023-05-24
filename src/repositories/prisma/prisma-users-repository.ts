import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findMany(data: Prisma.UserUncheckedCreateInput): Promise<User[]> {
    const { name, city_id, is_volunteer, status } = data

    let query: Prisma.UserWhereInput

    if (name || city_id || is_volunteer) {
      query = {
        OR: [
          { name: { contains: name, mode: 'insensitive' } },
          { city_id },
          { is_volunteer },
        ],
        AND: [{ status }],
      }
    } else {
      query = { status }
    }

    const user = await prisma.user.findMany({
      where: query,
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      select: {
        name: true,
        city: true,
        email: true,
        is_volunteer: true,
        id: true,
        role: true,

        avatar_url: true,

        volunteer: true,
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
