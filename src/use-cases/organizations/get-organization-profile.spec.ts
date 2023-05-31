import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { GetOrganizationProfileUseCase } from './get-organization-profile'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { Role } from '@prisma/client'

let usersRepository: InMemoryUsersRepository
let organizationsRepository: InMemoryOrganizationRepository
let sut: GetOrganizationProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new GetOrganizationProfileUseCase(organizationsRepository)
  })

  it('should be able to get user profile', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
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

    await usersRepository.update(
      {
        role: Role.ADMIN,
        organization_id: id,
      },
      userId,
    )

    const { organization } = await sut.execute({
      organizationId: id,
    })

    expect(organization.id).toEqual(expect.any(String))
    expect(organization.name).toEqual('ONG')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        organizationId: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
