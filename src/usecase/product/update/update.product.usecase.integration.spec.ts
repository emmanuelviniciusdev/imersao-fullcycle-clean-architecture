import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import Product from '../../../domain/product/entity/product'
import ProductFactory from '../../../domain/product/factory/product.factory'
import { UpdateProductUsecase } from './update.product.usecase'
import {
    InputUpdateProductUsecaseDTO,
    OutputUpdateProductUsecaseDTO,
} from './update.product.usecase.dto'

jest.mock('uuid', () => ({ v4: () => 'random-uuid-v4' }))

describe('UpdateProductUsecase Integration Tests', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })

        sequelize.addModels([ProductModel])

        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should update a product', async () => {
        const repository = new ProductRepository()

        const product = ProductFactory.create('Pumpkin', 0.8, 'Regular')

        await repository.create(product)

        const usecase = new UpdateProductUsecase(repository)

        const input: InputUpdateProductUsecaseDTO = {
            id: product.id,
            name: 'Pumpkin (UPDATED)',
            price: 1.17,
        }

        const output = await usecase.execute(input)

        const expectedOutput: OutputUpdateProductUsecaseDTO = {
            id: product.id,
            name: input.name,
            price: input.price,
        }

        expect(output).toStrictEqual(expectedOutput)
    })
})
