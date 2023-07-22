import express from 'express'
import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../customer/repository/sequelize/customer.model'
import ProductModel from '../product/repository/sequelize/product.model'
import { router as customerRouter } from './route/customer.route'
import { router as productRouter } from './route/product.route'

export const app = express()

app.use(express.json())

app.use('/customer', customerRouter)
app.use('/product', productRouter)

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    models: [CustomerModel, ProductModel],
})

sequelize.sync().catch(console.error)
