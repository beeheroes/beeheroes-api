import { Role, Status } from '@prisma/client'

export type UserSearchManyInput = {
  name?: string
  status?: Status
  role?: Role
  city_id?: number | null
}
