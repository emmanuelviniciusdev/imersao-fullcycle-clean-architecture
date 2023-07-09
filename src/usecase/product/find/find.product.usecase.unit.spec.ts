import ProductRepositoryInterface from '../../../domain/product/repository/product.repository.interface'
import ProductFactory from '../../../domain/product/factory/product.factory'
import { UpdateProductUsecase } from '../update/update.product.usecase'
import { InputUpdateProductUsecaseDTO } from '../update/update.product.usecase.dto'
import {
    InputFindProductUsecaseDTO,
    OutputFindProductUsecaseDTO,
} from './find.product.usecase.dto'
import { FindProductUsecase } from './find.product.usecase'

jest.mock('uuid', () => ({ v4: () => 'random-uuid-v4' }))

const product = ProductFactory.create('Pumpkin', 0.8, 'Regular')

describe('FindProductUsecase Unit Tests', () => {
    let mockProductRepository: ProductRepositoryInterface

    beforeEach(() => {
        mockProductRepository = {
            findAll: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(product)),
            create: jest.fn(),
            update: jest.fn(),
        }
    })

    it('should find a product', async () => {
        const usecase = new FindProductUsecase(mockProductRepository)

        const input: InputFindProductUsecaseDTO = {
            id: product.id,
        }

        const output = await usecase.execute(input)

        const expectedOutput: OutputFindProductUsecaseDTO = {
            id: product.id,
            name: product.name,
            price: product.price,
        }

        expect(output).toStrictEqual(expectedOutput)
    })
})
