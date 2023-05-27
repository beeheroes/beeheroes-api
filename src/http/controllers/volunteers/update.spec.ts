import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    const occupationArea = await prisma.occupationArea.create({
      data: {
        title: 'Dev',
      },
    })

    await prisma.volunteer.create({
      data: {
        occupation_id: occupationArea.id,
        user_id: user.id,
        id: user.id,
      },
    })

    const response = await request(app.server)
      .put('/volunteers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Hello, I am John Doe',
      })

    expect(response.statusCode).toEqual(201)
  })
})
