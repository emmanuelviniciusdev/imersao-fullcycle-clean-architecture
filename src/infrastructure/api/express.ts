import express from 'express'
import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../customer/repository/sequelize/customer.model'
import { router as customerRouter } from './route/customer.route'

export const app = express()

app.use(express.json())

app.use('/customer', customerRouter)

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    models: [CustomerModel],
})

sequelize.sync().catch(console.error)
