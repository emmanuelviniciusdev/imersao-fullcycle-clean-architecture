import { UsecaseAbstract } from '../../usecase.abstract'
import {
    InputFindProductUsecaseDTO,
    OutputFindProductUsecaseDTO,
} from './find.product.usecase.dto'
import ProductRepositoryInterface from '../../../domain/product/repository/product.repository.interface'

export class FindProductUsecase extends UsecaseAbstract<
    InputFindProductUsecaseDTO,
    OutputFindProductUsecaseDTO
> {
    constructor(private repository: ProductRepositoryInterface) {
        super()
    }

    async execute(
        input: InputFindProductUsecaseDTO
    ): Promise<OutputFindProductUsecaseDTO> {
        const product = await this.repository.find(input.id)

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        }
    }
}
