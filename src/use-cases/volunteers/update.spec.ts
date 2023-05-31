import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UpdateUseCase } from './update'
import { InMemoryVolunteerRepository } from '@/repositories/in-memory/in-memory-volunteers-repository'

let usersRepository: InMemoryUsersRepository
let volunteerRepository: InMemoryVolunteerRepository
let sut: UpdateUseCase

describe('Update Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    volunteerRepository = new InMemoryVolunteerRepository()
    sut = new UpdateUseCase(volunteerRepository)
  })

  it('should be able to update', async () => {
    const { id } = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await volunteerRepository.create(
      {
        user_id: id,
        description: 'Hello, I am John Doe',
        title: 'dev',
        occupation_id: 1,
      },
      id,
    )

    const description = 'Hello, I am John Doe'

    await sut.execute({ description, id })

    const volunteer = await volunteerRepository.findById(id)

    expect(volunteer?.description).toEqual(description)
  })
})
