import { prisma } from '@/lib/prisma'
import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { OrganizationSearchManyInput } from '@/@types/OrganizationSearchManyInput'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async searchMany(data: OrganizationSearchManyInput): Promise<Organization[]> {
    const { name, city_id, organization_type_id, status } = data

    const organizations = await prisma.organization.findMany({
      where: {
        AND: [
          { name: { contains: name, mode: 'insensitive' } },
          { city_id },
          { organization_type_id },
          { status },
        ],
      },
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
