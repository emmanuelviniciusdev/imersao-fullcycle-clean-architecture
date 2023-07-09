import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import ProductFactory from '../../../domain/product/factory/product.factory'
import { FindProductUsecase } from './find.product.usecase'
import {
    InputFindProductUsecaseDTO,
    OutputFindProductUsecaseDTO,
} from './find.product.usecase.dto'

jest.mock('uuid', () => ({ v4: () => 'random-uuid-v4' }))

describe('FindProductUsecase Integration Tests', () => {
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

    it('should find a product', async () => {
        const repository = new ProductRepository()

        const product = ProductFactory.create('Pumpkin', 0.8, 'Regular')

        await repository.create(product)

        const input: InputFindProductUsecaseDTO = {
            id: product.id,
        }

        const usecase = new FindProductUsecase(repository)

        const output = await usecase.execute(input)

        const expectedOutput: OutputFindProductUsecaseDTO = {
            id: product.id,
            name: product.name,
            price: product.price,
        }

        expect(output).toStrictEqual(expectedOutput)
    })
})
