import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const state = await prisma.state.create({
      data: {
        name: 'state',
        uf: 'uf',
      },
    })

    const city = await prisma.city.create({
      data: {
        name: 'JavaScript Gym',
        state_id: state.id,
      },
    })

    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      avatarUrl: 'avatar.jpg',
      cityId: city.id,
      isVolunteer: true,
    })

    expect(response.statusCode).toEqual(201)
  })
})
