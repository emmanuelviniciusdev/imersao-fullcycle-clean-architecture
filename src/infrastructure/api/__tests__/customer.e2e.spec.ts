import { app, sequelize } from '../express'
import request from 'supertest'

jest.mock('uuid', () => ({ v4: () => 'random-uuid-v4' }))

describe('Customer E2E Tests', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should list all customers', async () => {
        await request(app)
            .post('/customer')
            .send({
                name: 'Emmanuel',
                address: {
                    street: 'Street X',
                    number: '1',
                    zipCode: '00000-00',
                    city: 'Montreal',
                },
            })

        const response = await request(app).get('/customer/list')

        expect(response.status).toBe(200)
        expect(response.body.customers).toHaveLength(1)
    })

    it('should not create a customer', async () => {
        const body = {}

        const response = await request(app).post('/customer').send(body)

        expect(response.status).toBe(500)
    })

    it('should create a customer', async () => {
        const body = {
            name: 'Emmanuel',
            address: {
                street: 'Street X',
                number: '1',
                zipCode: '00000-00',
                city: 'Montreal',
            },
        }

        const response = await request(app).post('/customer').send(body)

        expect(response.status).toBe(201)
        expect(response.body.name).toBe('Emmanuel')
        expect(response.body.address.street).toBe('Street X')
        expect(response.body.address.number).toBe('1')
        expect(response.body.address.zipCode).toBe('00000-00')
        expect(response.body.address.city).toBe('Montreal')
    })
})
