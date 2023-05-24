import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { UserAlreadyExistsError } from '../errors/user-already-exist-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UpdateUseCase } from './update'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUseCase

describe('Update Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUseCase(usersRepository)
  })

  it('should be able to update', async () => {
    const newUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      is_volunteer: true,
    })

    const { user } = await sut.execute({
      name: 'John Doe - Edit',
      email: 'johndoe@example.com',
      password: '123456',
      avatarUrl: 'avatar.jpg',
      cityId: 1,
      isVolunteer: true,

      id: newUser.id,
    })

    expect(user.name).toEqual('John Doe - Edit')
  })

  it('should not be able to edit inexistent user', async () => {
    await expect(() =>
      sut.execute({
        name: 'John Doe - Edit',
        email: 'johndoe-edit@example.com',
        password: '123456',
        avatarUrl: 'avatar.jpg',
        cityId: 1,
        isVolunteer: true,
        id: 'fake-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to edit with same email twice', async () => {
    const newUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      is_volunteer: true,
    })

    const email = 'johndoe-edit@example.com'

    await usersRepository.create({
      name: 'John Doe',
      email,
      password_hash: await hash('123456', 6),
      is_volunteer: true,
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe - Edit',
        email: 'johndoe-edit@example.com',
        password: '123456',
        avatarUrl: 'avatar.jpg',
        cityId: 1,
        isVolunteer: true,
        id: newUser.id,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
