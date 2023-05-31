import { Prisma, Volunteer } from '@prisma/client'

export interface VolunteersRepository {
  findById(userId: string): Promise<Volunteer | null>

  create(
    data: Prisma.VolunteerUncheckedCreateInput,
    userId: string,
  ): Promise<Volunteer>
  update(
    data: Prisma.VolunteerUncheckedUpdateInput,
    userId: string,
  ): Promise<Volunteer>
}
