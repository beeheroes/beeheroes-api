import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const occupationArea = await prisma.occupationArea.create({
      data: {
        title: 'Dev',
      },
    })

    const response = await request(app.server)
      .post('/volunteers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Hello, I am John Doe',
        occupationAreaId: occupationArea.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
