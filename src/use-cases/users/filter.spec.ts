import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { FilterUseCase } from './filter'
import { Status } from '@prisma/client'

let usersRepository: InMemoryUsersRepository
let sut: FilterUseCase

describe('Filter Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FilterUseCase(usersRepository)
  })

  it('should be able to get active users', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { id } = await usersRepository.create({
      name: 'John Doe 2',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await usersRepository.update(
      {
        status: Status.INACTIVE,
      },
      id,
    )

    const page = 1

    const { users } = await sut.execute({ page })

    expect(users.length).toBe(1)
  })

  it('should be able to get active users for name', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await usersRepository.create({
      name: 'Test Search for name',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const page = 1

    const { users } = await sut.execute({ name: 'Search', page })

    expect(users.length).toBe(1)
  })
})
