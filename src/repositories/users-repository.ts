import { ProfileUser } from '@/@types/ProfileUser'
import { UserSearchManyInput } from '@/@types/UserSearchManyInput'
import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  findById(userId: string): Promise<ProfileUser | null>
  searchMany(query: UserSearchManyInput, page: number): Promise<User[]>
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>
  update(data: Prisma.UserUncheckedUpdateInput, userId: string): Promise<User>
}
