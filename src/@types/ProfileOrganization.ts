import { City, User } from '@prisma/client'
import { S } from 'vitest/dist/types-b7007192'

export interface ProfileOrganization {
  id: string

  name: string
  email: string
  cnpj: string
  description?: string | null
  avatar_url: string | null
  phone?: number | null
  whatsapp?: number | null
  address?: string | null
  city?: City | null

  organizationType?: {
    title: string
  }

  users?: User[]
}
