import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import ProductFactory from '../../../domain/product/factory/product.factory'
import Product from '../../../domain/product/entity/product'
import { InputListProductUsecaseDTO } from './list.product.usecase.dto'
import { ListProductUsecase } from './list.product.usecase'

jest.mock('uuid', () => ({ v4: () => 'random-uuid-v4' }))

describe('ListCustomerUsecase Integration Tests', () => {
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

    it('should list all products', async () => {
        const repository = new ProductRepository()

        const products = [
            new Product('c324d38b-4ea5-443a-955d-0d9c91747dea', 'Pumpkin', 0.8),
            new Product('aa9e6df5-5694-4d5c-9410-180626e9b397', 'Grapes', 1.2),
        ]

        await repository.create(products[0])
        await repository.create(products[1])

        const usecase = new ListProductUsecase(repository)

        const input: InputListProductUsecaseDTO = {}

        const output = await usecase.execute(input)

        expect(output.products).toHaveLength(2)

        for (const productOutput of output.products) {
            const expectedProductOutput = products.find(
                (p) => p.id === productOutput.id
            )

            expect(productOutput.id).toBe(expectedProductOutput.id)
            expect(productOutput.name).toBe(expectedProductOutput.name)
            expect(productOutput.price).toBe(expectedProductOutput.price)
        }
    })
})
