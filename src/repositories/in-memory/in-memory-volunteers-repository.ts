import { Prisma, Volunteer } from '@prisma/client'
import { VolunteerRepository } from '../volunteer-repository'

export class InMemoryVolunteerRepository implements VolunteerRepository {
  public items: Volunteer[] = []

  async findById(userId: string): Promise<Volunteer | null> {
    const volunteer = this.items.find((item) => item.id === userId)

    if (!volunteer) {
      return null
    }

    return volunteer
  }

  async create(
    data: Prisma.VolunteerUncheckedCreateInput,
    userId: string,
  ): Promise<Volunteer> {
    const volunteer = {
      id: userId,
      description: data.description ? data.description : null,
      title: data.title ? data.title : null,
      user_id: userId,
      occupation_id: data.occupation_id ? data.occupation_id : 1,
    }

    this.items.push(volunteer)

    return volunteer
  }

  async update(
    data: Prisma.VolunteerUncheckedUpdateInput,
    userId: string,
  ): Promise<Volunteer> {
    const findIndex = this.items.findIndex((user) => user.id === userId)

    if (data.description)
      this.items[findIndex].description = data.description as string
    if (data.title) this.items[findIndex].title = data.title as string

    if (data.occupation_id)
      this.items[findIndex].occupation_id = data.occupation_id as number

    return this.items[findIndex]
  }
}
