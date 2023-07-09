import ProductRepositoryInterface from '../../../domain/product/repository/product.repository.interface'
import { UpdateProductUsecase } from './update.product.usecase'
import {
    InputUpdateProductUsecaseDTO,
    OutputUpdateProductUsecaseDTO,
} from './update.product.usecase.dto'
import ProductFactory from '../../../domain/product/factory/product.factory'

jest.mock('uuid', () => ({ v4: () => 'random-uuid-v4' }))

const product = ProductFactory.create('Pumpkin', 0.8, 'Regular')

describe('UpdateProductUsecase Unit Tests', () => {
    let mockProductRepository: ProductRepositoryInterface

    beforeEach(() => {
        mockProductRepository = {
            findAll: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(product)),
            create: jest.fn(),
            update: jest.fn(),
        }
    })

    it('should update a product', async () => {
        const usecase = new UpdateProductUsecase(mockProductRepository)

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
