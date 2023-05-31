import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

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
    })

    const { user } = await sut.execute({
      name: 'John Doe - Edit',
      password: '123456',
      avatarUrl: 'avatar.jpg',
      cityId: 1,

      id: newUser.id,
    })

    expect(user.name).toEqual('John Doe - Edit')
  })

  it('should not be able to update an inexistent user', async () => {
    await expect(() =>
      sut.execute({
        name: 'John Doe',
        id: 'fake-user',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
