import ProductRepositoryInterface from '../../../domain/product/repository/product.repository.interface'
import { CreateProductUsecase } from './create.product.usecase'
import {
    InputCreateProductUsecaseDTO,
    OutputCreateProductUsecaseDTO,
} from './create.product.usecase.dto'

jest.mock('uuid', () => ({ v4: () => 'random-uuid-v4' }))

describe('CreateProductUsecase Unit Tests', () => {
    let mockProductRepository: ProductRepositoryInterface

    beforeEach(() => {
        mockProductRepository = {
            findAll: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        }
    })

    it('should create a product', async () => {
        const usecase = new CreateProductUsecase(mockProductRepository)

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
