import { Organization, Prisma, Status } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { OrganizationSearchManyInput } from '@/@types/OrganizationSearchManyInput'
import { randomUUID } from 'node:crypto'
import { ProfileOrganization } from '@/@types/ProfileOrganization'

export class InMemoryOrganizationRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async findById(id: string): Promise<ProfileOrganization | null> {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }

  async findByCnpj(cnpj: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.cnpj === cnpj)

    if (!organization) {
      return null
    }

    return organization
  }

  async searchMany(data: OrganizationSearchManyInput): Promise<Organization[]> {
    const organizations = this.items.filter((organization) => {
      const { name, city_id, organization_type_id, status } = data

      if (!organization_type_id && !name && !city_id) {
        if (data.status && organization.status === data.status) {
          return organization
        }

        return null
      } else if (
        (name && organization.name.includes(name)) ||
        organization.organization_type_id === organization_type_id ||
        (organization.city_id === city_id && organization.status === status)
      ) {
        return organization
      }

      return null
    })

    return organizations
  }

  async create(
    data: Prisma.OrganizationUncheckedCreateInput,
  ): Promise<Organization> {
    const organization = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      cnpj: data.cnpj,
      description: data.description ? data.description : null,
      phone: data.phone ? data.phone : null,
      whatsapp: data.whatsapp ? data.whatsapp : null,
      city_id: data.city_id ? data.city_id : null,
      avatar_url: data.avatar_url ? data.avatar_url : null,
      address: data.address ? data.address : null,
      created_at: new Date(),
      status: Status.ACTIVE,
      organization_type_id: data.organization_type_id,
      users: data.users ? data.users : null,
    }

    this.items.push(organization)

    return organization
  }

  async update(
    data: Prisma.OrganizationUncheckedUpdateInput,
    organizationId: string,
  ): Promise<Organization> {
    const findIndex = this.items.findIndex(
      (organization) => organization.id === organizationId,
    )

    if (data.name) this.items[findIndex].name = data.name as string
    if (data.email) this.items[findIndex].email = data.email as string
    if (data.cnpj) this.items[findIndex].cnpj = data.cnpj as string
    if (data.description)
      this.items[findIndex].description = data.description as string
    if (data.avatar_url)
      this.items[findIndex].avatar_url = data.avatar_url as string
    if (data.phone) this.items[findIndex].phone = data.cnpj as number
    if (data.whatsapp) this.items[findIndex].whatsapp = data.cnpj as number
    if (data.address) this.items[findIndex].address = data.address as string
    if (data.city_id) this.items[findIndex].city_id = data.city_id as number
    if (data.status) this.items[findIndex].status = data.status as Status

    return this.items[findIndex]
  }
}
