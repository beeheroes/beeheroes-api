import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { Role } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exist-error'

let usersRepository: InMemoryUsersRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new RegisterUseCase(usersRepository, organizationRepository)
  })
  it('should be able to register', async () => {
    const { id } = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { organization } = await sut.execute({
      name: 'ONG',
      email: 'ong@example.com',
      cnpj: '1111',
      description: 'This is a ong',
      phone: 999 - 999,
      whatsapp: 999 - 999,
      address: 'Rua fulana de tal',
      avatarUrl: 'avatarUrl',
      cityId: 1,
      organizationTypeId: 1,
      userId: id,
    })

    const user = await usersRepository.findById(id)

    expect(organization.id).toEqual(expect.any(String))
    expect(user?.role).toEqual(Role.ADMIN)
  })

  it('should not be able to register a volunteer with invalid id', async () => {
    await expect(() =>
      sut.execute({
        name: 'ONG',
        email: 'ong@example.com',
        cnpj: '1111',
        description: 'This is a ong',
        phone: 999 - 999,
        whatsapp: 999 - 999,
        address: 'Rua fulana de tal',
        avatarUrl: 'avatarUrl',
        cityId: 1,
        organizationTypeId: 1,
        userId: 'fake-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it.only('should not be able to register with same cpnj twice', async () => {
    const cnpj = '11111111111111'

    const { id } = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await sut.execute({
      name: 'ONG',
      email: 'ong@example.com',
      cnpj,
      description: 'This is a ong',
      phone: 999999,
      whatsapp: 999999,
      address: 'Rua fulana de tal',
      avatarUrl: 'avatarUrl',
      cityId: 1,
      organizationTypeId: 1,
      userId: id,
    })

    await expect(() =>
      sut.execute({
        name: 'ONG',
        email: 'ong@example.com',
        cnpj,
        description: 'This is a ong',
        phone: 999999,
        whatsapp: 999999,
        address: 'Rua fulana de tal',
        avatarUrl: 'avatarUrl',
        cityId: 1,
        organizationTypeId: 1,
        userId: id,
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
