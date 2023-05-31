import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Fetch (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get active users', async () => {
    await createAndAuthenticateUser(app)

    const profileResponse = await request(app.server)
      .get('/users/name=John Doe')
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.users[0]).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      }),
    )
  })
})
