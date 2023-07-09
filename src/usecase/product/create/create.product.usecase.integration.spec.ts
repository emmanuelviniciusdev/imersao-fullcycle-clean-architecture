import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import {
    InputCreateProductUsecaseDTO,
    OutputCreateProductUsecaseDTO,
} from './create.product.usecase.dto'
import { CreateProductUsecase } from './create.product.usecase'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'

jest.mock('uuid', () => ({ v4: () => 'random-uuid-v4' }))

describe('CreateProductUsecase Integration Tests', () => {
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

    it('should create a product', async () => {
        const repository = new ProductRepository()

        const usecase = new CreateProductUsecase(repository)

        const input: InputCreateProductUsecaseDTO = {
            name: 'Pumpkin',
            price: 0.8,
        }

        const output = await usecase.execute(input)

        const expectedOutput: OutputCreateProductUsecaseDTO = {
            id: expect.any(String),
            name: input.name,
            price: input.price,
        }

        expect(output).toStrictEqual(expectedOutput)
    })
})
