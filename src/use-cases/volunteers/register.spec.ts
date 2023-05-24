import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryVolunteerRepository } from '@/repositories/in-memory/in-memory-volunteers-repository'

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
      is_volunteer: true,
    })

    const { volunteer } = await sut.execute({
      id,
      description: 'Hello, I am John Doe',
      role: 'dev',
      occupationAreaId: 1,
    })

    expect(volunteer.id).toEqual(expect.any(String))
  })
})
