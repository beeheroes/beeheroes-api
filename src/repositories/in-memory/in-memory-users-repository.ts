import { User, Prisma, Role } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      is_volunteer: true,
      status: 1,
      created_at: new Date(),
      city_id: data.city_id ? data.city_id : null,
      avatar_url: data.avatar_url ? data.avatar_url : null,
      role: Role.MEMBER,
    }

    this.items.push(user)

    return user
  }
}
