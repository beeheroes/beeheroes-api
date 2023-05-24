import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  findById(userId: string): Promise<User | null>
  findMany(data: Prisma.UserUncheckedUpdateInput): Promise<User[]>
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>
  update(data: Prisma.UserUncheckedUpdateInput, userId: string): Promise<User>
}
