import { User, Prisma, Role, Status } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'
import { ProfileUser } from '@/@types/ProfileUser'
import { UserSearchManyInput } from '@/@types/UserSearchManyInput'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async searchMany(query: UserSearchManyInput, page: number): Promise<User[]> {
    const users = this.items
      .filter((user) => {
        const { name, city_id, status, role } = query

        if (!name && !city_id && !role) {
          if (query.status && user.status === query.status) {
            return user
          }

          return null
        } else if (
          (name && user.name.includes(name)) ||
          (role && user.role === role) ||
          (city_id && user.city_id === city_id && user.status === status)
        ) {
          return user
        }

        return null
      })
      .slice((page - 1) * 20, page * 20)

    return users
  }

  async findById(id: string): Promise<ProfileUser | null> {
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
      status: Status.ACTIVE,
      created_at: new Date(),
      city_id: data.city_id ? data.city_id : null,
      avatar_url: data.avatar_url ? data.avatar_url : null,
      role: Role.MEMBER,
      organization_id: null,
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
    if (data.password_hash)
      this.items[findIndex].password_hash = data.password_hash as string
    if (data.role) this.items[findIndex].role = data.role as Role
    if (data.status) this.items[findIndex].status = data.status as Status
    if (data.organization_id)
      this.items[findIndex].organization_id = data.organization_id as string

    return this.items[findIndex]
  }
}
