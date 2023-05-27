import { prisma } from '@/lib/prisma'
import { Prisma, Volunteer } from '@prisma/client'
import { VolunteerRepository } from '../volunteer-repository'

export class PrismaVolunteerRepository implements VolunteerRepository {
  async findById(userId: string) {
    const volunteer = await prisma.volunteer.findUnique({
      where: {
        user_id: userId,
      },
    })

    return volunteer
  }

  async create(data: Prisma.VolunteerUncheckedCreateInput) {
    const volunteer = await prisma.volunteer.create({
      data,
    })
    return volunteer
  }

  async update(
    data: Prisma.VolunteerUncheckedUpdateInput,
    id: string,
  ): Promise<Volunteer> {
    const volunteer = await prisma.volunteer.update({
      where: {
        id,
      },
      data,
    })

    return volunteer
  }
}
