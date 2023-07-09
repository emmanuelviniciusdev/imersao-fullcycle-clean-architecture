import { UsecaseAbstract } from '../../usecase.abstract'
import ProductRepositoryInterface from '../../../domain/product/repository/product.repository.interface'
import {
    InputCreateProductUsecaseDTO,
    OutputCreateProductUsecaseDTO,
} from './create.product.usecase.dto'
import ProductFactory from '../../../domain/product/factory/product.factory'

export class CreateProductUsecase extends UsecaseAbstract<
    InputCreateProductUsecaseDTO,
    OutputCreateProductUsecaseDTO
> {
    constructor(private repository: ProductRepositoryInterface) {
        super()
    }

    async execute(
        input: InputCreateProductUsecaseDTO
    ): Promise<OutputCreateProductUsecaseDTO> {
        const product = ProductFactory.create(
            input.name,
            input.price,
            'Regular'
        )

        await this.repository.create(product)

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        }
    }
}
