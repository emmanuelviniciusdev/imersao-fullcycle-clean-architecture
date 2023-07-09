import { UsecaseAbstract } from '../../usecase.abstract'
import {
    InputListProductUsecaseDTO,
    OutputListProductUsecaseDTO,
} from './list.product.usecase.dto'
import ProductRepositoryInterface from '../../../domain/product/repository/product.repository.interface'

export class ListProductUsecase extends UsecaseAbstract<
    InputListProductUsecaseDTO,
    OutputListProductUsecaseDTO
> {
    constructor(private repository: ProductRepositoryInterface) {
        super()
    }

    async execute(
        input: InputListProductUsecaseDTO
    ): Promise<OutputListProductUsecaseDTO> {
        const foundProducts = await this.repository.findAll()

        const products = foundProducts.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
        }))

        return { products }
    }
}
