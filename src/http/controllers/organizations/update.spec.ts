import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Update (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit', async () => {
    const { token } = await createAndAuthenticateUser(app)
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

    const organizationType = await prisma.organizationType.create({
      data: {
        title: 'Proteção aos animais',
      },
    })

    const organization = await prisma.organization.create({
      data: {
        name: 'ONG',
        email: 'ong@example.com',
        cnpj: '1111',
        description: 'This is a ong',
        phone: 999 - 999,
        whatsapp: 999 - 999,
        address: 'Rua fulana de tal',
        avatar_url: 'avatarUrl',
        city_id: city.id,
        organization_type_id: organizationType.id,
      },
    })

    const response = await request(app.server)
      .put('/organizations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'ong2example.com',
        id: organization.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
