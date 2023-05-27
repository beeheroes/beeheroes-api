import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryVolunteerRepository } from '@/repositories/in-memory/in-memory-volunteers-repository'
import { Role } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let volunteerRepository: InMemoryVolunteerRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    volunteerRepository = new InMemoryVolunteerRepository()
    sut = new RegisterUseCase(usersRepository, volunteerRepository)
  })

  it('should be able to register a volunteer', async () => {
    const { id } = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { volunteer } = await sut.execute({
      id,
      description: 'Hello, I am John Doe',
      occupationAreaId: 1,
    })

    const user = await usersRepository.findById(id)

    expect(volunteer.id).toEqual(expect.any(String))
    expect(user?.role).toEqual(Role.VOLUNTEER)
  })

  it('should not be able to register a volunteer with invalid id', async () => {
    await expect(() =>
      sut.execute({
        description: 'Hello, I am John Doe',
        occupationAreaId: 1,
        id: 'fake-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
