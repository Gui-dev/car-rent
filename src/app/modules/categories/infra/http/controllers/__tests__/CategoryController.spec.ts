import request from 'supertest'
import { Connection } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { app } from '@shared/infra/http/App'
import createConnection from '@shared/infra/database'
import { BcryptHashProvider } from '@modules/users/providers/hashProvider/implementations/BcryptHasProvider'

let connection: Connection

describe('CategoryController', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const bcryptHashProvider = new BcryptHashProvider()
    const password = await bcryptHashProvider.generateHash('123456')
    const id = uuid()

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, driver_license, "admin", created_at)
      VALUES('${id}', 'Batman', 'batman@email.com', '${password}', 'XXXXXXXXX', 'true', 'now()')
      `
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'batman@email.com',
      password: '123456'
    })

    const { refresh_token } = responseToken.body

    const response = await request(app).post('/categories')
      .send({
        name: 'fake_name',
        description: 'fake_description'
      })
      .set({
        Authorization: `Bearer ${refresh_token}`
      })

    expect(response.status).toBe(201)
  })

  it('should not be able to create a new category with the same name', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'batman@email.com',
      password: '123456'
    })

    const { refresh_token } = responseToken.body

    const response = await request(app).post('/categories')
      .send({
        name: 'fake_name',
        description: 'fake_description'
      })
      .set({
        Authorization: `Bearer ${refresh_token}`
      })

    expect(response.status).toBe(400)
  })

  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'batman@email.com',
      password: '123456'
    })

    const { refresh_token } = responseToken.body

    await request(app).post('/categories')
      .send({
        name: 'fake_name',
        description: 'fake_description'
      })
      .set({
        Authorization: `Bearer ${refresh_token}`
      })

    const response = await request(app).get('/categories')

    expect(response.status).toBe(201)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty('id')
  })
})
