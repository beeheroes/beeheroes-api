import { City, Role } from '@prisma/client'

export interface ProfileUser {
  name: string
  city?: City | null
  email: string
  id: string
  role: Role | null

  avatar_url: string | null

  volunteer?: {
    id: string
    description: string | null
    title: string | null
    occupationAreaId?: number
  } | null

  organization?: {
    id: string
    name: string
    organizationType?: number
  } | null
}
