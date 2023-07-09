import { UsecaseAbstract } from '../../usecase.abstract'
import {
    InputUpdateProductUsecaseDTO,
    OutputUpdateProductUsecaseDTO,
} from './update.product.usecase.dto'
import ProductRepositoryInterface from '../../../domain/product/repository/product.repository.interface'

export class UpdateProductUsecase extends UsecaseAbstract<
    InputUpdateProductUsecaseDTO,
    OutputUpdateProductUsecaseDTO
> {
    constructor(private repository: ProductRepositoryInterface) {
        super()
    }

    async execute(
        input: InputUpdateProductUsecaseDTO
    ): Promise<OutputUpdateProductUsecaseDTO> {
        const product = await this.repository.find(input.id)

        product.changeName(input.name)
        product.changePrice(input.price)

        await this.repository.update(product)

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        }
    }
}
