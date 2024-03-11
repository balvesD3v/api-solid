import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'SS gym',
        description: 'Some',
        phone: '987654321',
        latitude: -5.9494819,
        longitude: -35.2525748,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'AA gym',
        description: 'Some',
        phone: '987654321',
        latitude: -5.141185,
        longitude: -36.50612,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -5.9494819,
        longitude: -35.2525748,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'SS gym',
      }),
    ])
  })
})
