import { Status } from '@prisma/client'

export type OrganizationSearchManyInput = {
  name?: string
  status?: Status
  organization_type_id?: number
  city_id?: number | null
}
