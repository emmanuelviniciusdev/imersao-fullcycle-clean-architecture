import ProductRepositoryInterface from '../../../domain/product/repository/product.repository.interface'
import ProductFactory from '../../../domain/product/factory/product.factory'
import { ListProductUsecase } from './list.product.usecase'
import { InputListProductUsecaseDTO } from './list.product.usecase.dto'
import Product from '../../../domain/product/entity/product'

const products = [
    new Product('c324d38b-4ea5-443a-955d-0d9c91747dea', 'Pumpkin', 0.8),
    new Product('aa9e6df5-5694-4d5c-9410-180626e9b397', 'Grapes', 1.2),
]

describe('ListProductUsecase Unit Tests', () => {
    let mockProductRepository: ProductRepositoryInterface

    beforeEach(() => {
        mockProductRepository = {
            findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
            find: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        }
    })

    it('should list all products', async () => {
        const usecase = new ListProductUsecase(mockProductRepository)

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
