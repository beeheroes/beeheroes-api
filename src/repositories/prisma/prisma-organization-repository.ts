import { prisma } from '@/lib/prisma'
import { Organization, Prisma } from '@prisma/client'
import { OrganizationRepository } from '../organization-repository'
import { OrganizationSearchManyInput } from '@/@types/OrganizationSearchManyInput'

export class PrismaOrganizationsRepository implements OrganizationRepository {
  async searchMany(data: OrganizationSearchManyInput): Promise<Organization[]> {
    const { name, city_id, organization_type_id, status } = data

    let query: Prisma.OrganizationWhereInput

    if (name || city_id || organization_type_id) {
      query = {
        OR: [
          { name: { contains: name, mode: 'insensitive' } },
          { city_id },
          { organization_type_id },
        ],
        AND: [{ status }],
      }
    } else {
      query = { status }
    }

    const organizations = await prisma.organization.findMany({
      where: query,
    })

    return organizations
  }

  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      select: {
        id: true,
        name: true,
        city: true,
        email: true,
        cnpj: true,
        description: true,
        avatar_url: true,
        phone: true,
        whatsapp: true,
        address: true,
        users: true,
        organizationType: true,
        status: true,
      },
      where: {
        id,
      },
    })

    return organization
  }

  async findByCnpj(cnpj: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        cnpj,
      },
    })

    return organization
  }

  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })
    return organization
  }

  async update(
    data: Prisma.OrganizationUncheckedUpdateInput,
    id: string,
  ): Promise<Organization> {
    const organization = await prisma.organization.update({
      where: {
        id,
      },
      data,
    })

    return organization
  }
}
