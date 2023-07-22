import { app, sequelize } from '../express'
import request from 'supertest'

jest.mock('uuid', () => ({ v4: () => 'random-uuid-v4' }))

describe('Product E2E Tests', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should list all products', async () => {
        await request(app).post('/product').send({
            name: 'Pumpkin',
            price: 0.8,
        })

        const response = await request(app).get('/product/list')

        expect(response.status).toBe(200)
        expect(response.body.products).toHaveLength(1)
    })
})
