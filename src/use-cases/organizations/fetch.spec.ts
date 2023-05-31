import { expect, describe, it, beforeEach } from 'vitest'
import { FetchUseCase } from './fetch'
import { Status } from '@prisma/client'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'

let organizationsRepository: InMemoryOrganizationRepository
let sut: FetchUseCase

describe('Fetch Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new FetchUseCase(organizationsRepository)
  })

  it('should be able to get active organizations', async () => {
    await organizationsRepository.create({
      name: 'ONG',
      email: 'ong@example.com',
      cnpj: '1111',
      description: 'This is a ong',
      phone: 999 - 999,
      whatsapp: 999 - 999,
      address: 'Rua fulana de tal',
      avatar_url: 'avatarUrl',
      city_id: 1,
      organization_type_id: 1,
    })

    const { id } = await organizationsRepository.create({
      name: 'ONG',
      email: 'ong@example.com',
      cnpj: '1111',
      description: 'This is a ong',
      phone: 999 - 999,
      whatsapp: 999 - 999,
      address: 'Rua fulana de tal',
      avatar_url: 'avatarUrl',
      city_id: 1,
      organization_type_id: 1,
    })

    await organizationsRepository.update(
      {
        status: Status.INACTIVE,
      },
      id,
    )

    const page = 1

    const { organizations } = await sut.execute({ page })

    expect(organizations.length).toBe(1)
  })

  it('should be able to get active organization for name', async () => {
    await organizationsRepository.create({
      name: 'ONG',
      email: 'ong@example.com',
      cnpj: '1111',
      description: 'This is a ong',
      phone: 999 - 999,
      whatsapp: 999 - 999,
      address: 'Rua fulana de tal',
      avatar_url: 'avatarUrl',
      city_id: 1,
      organization_type_id: 1,
    })

    await organizationsRepository.create({
      name: 'Search',
      email: 'ong@example.com',
      cnpj: '1111',
      description: 'This is a ong',
      phone: 999 - 999,
      whatsapp: 999 - 999,
      address: 'Rua fulana de tal',
      avatar_url: 'avatarUrl',
      city_id: 1,
      organization_type_id: 1,
    })

    const page = 1

    const { organizations } = await sut.execute({ name: 'Search', page })

    expect(organizations.length).toBe(1)
  })
})
