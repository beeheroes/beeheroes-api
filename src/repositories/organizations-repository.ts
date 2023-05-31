import { OrganizationSearchManyInput } from '@/@types/OrganizationSearchManyInput'
import { ProfileOrganization } from '@/@types/ProfileOrganization'
import { Prisma, Organization } from '@prisma/client'

export interface OrganizationsRepository {
  findById(organizationId: string): Promise<ProfileOrganization | null>
  findByCnpj(cnpj: string): Promise<Organization | null>
  searchMany(
    query: OrganizationSearchManyInput,
    page: number,
  ): Promise<Organization[]>
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
  update(
    data: Prisma.OrganizationUncheckedUpdateInput,
    organizationId: string,
  ): Promise<Organization>
}
