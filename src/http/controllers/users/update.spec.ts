import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        avatarUrl: 'avatar.jpg',
        isVolunteer: true,
      })

    expect(response.statusCode).toEqual(201)
  })
})
