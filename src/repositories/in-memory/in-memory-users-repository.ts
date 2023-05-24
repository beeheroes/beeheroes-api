import { User, Prisma, Role, Status } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findMany(data: Prisma.UserUncheckedCreateInput): Promise<User[]> {
    const users = this.items.filter((user) => {
      const { email, name, city_id, status } = data

      if (!email && !name && !city_id) {
        if (data.status && user.status === data.status) {
          return user
        }

        return null
      } else if (
        user.email.includes(email) ||
        user.name.includes(name) ||
        (user.city_id === city_id && user.status === status)
      ) {
        return user
      }

      return null
    })

    return users
  }

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
      status: Status.ACTIVE,
      created_at: new Date(),
      city_id: data.city_id ? data.city_id : null,
      avatar_url: data.avatar_url ? data.avatar_url : null,
      role: Role.MEMBER,
    }

    this.items.push(user)

    return user
  }

  async update(
    data: Prisma.UserUncheckedUpdateInput,
    id: String,
  ): Promise<User> {
    const findIndex = this.items.findIndex((user) => user.id === id)

    if (data.name) this.items[findIndex].name = data.name as string
    if (data.email) this.items[findIndex].email = data.email as string
    if (data.avatar_url)
      this.items[findIndex].avatar_url = data.avatar_url as string
    if (data.city_id) this.items[findIndex].city_id = data.city_id as number
    if (data.is_volunteer)
      this.items[findIndex].is_volunteer = data.is_volunteer as boolean
    if (data.password_hash)
      this.items[findIndex].password_hash = data.password_hash as string
    if (data.role) this.items[findIndex].role = data.role as Role
    if (data.status) this.items[findIndex].status = data.status as Status

    return this.items[findIndex]
  }
}
