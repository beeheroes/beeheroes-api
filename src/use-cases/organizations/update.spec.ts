import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UpdateUseCase } from './update'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { Role } from '@prisma/client'

let usersRepository: InMemoryUsersRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: UpdateUseCase

describe('Update Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new UpdateUseCase(usersRepository, organizationRepository)
  })

  it('should be able to update', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { id } = await organizationRepository.create({
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

    const description = 'Hello, I am John Doe'

    await sut.execute({ description, id })

    const organizationEdit = await organizationRepository.findById(id)

    expect(organizationEdit?.description).toEqual(description)
  })

  it('should not be able to edit inexistent organization', async () => {
    await expect(() =>
      sut.execute({
        description: 'Hello, I am John Doe',
        id: 'fake-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able to update users ', async () => {
    const { id: userId1 } = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { id: userId2 } = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { id } = await organizationRepository.create({
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
      userId1,
    )

    const users = [
      {
        id: userId2,
        role: Role.ADMIN,
        isActive: true,
      },
      { id: userId1, isActive: false },
    ]

    await sut.execute({ users, id })

    const userResult = await usersRepository.findById(userId2)

    expect(userResult).toEqual(
      expect.objectContaining({
        organization_id: id,
      }),
    )
  })
})
