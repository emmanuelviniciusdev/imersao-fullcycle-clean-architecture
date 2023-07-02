import {
    InputFindCustomerUsecaseDTO,
    OutputFindCustomerUsecaseDTO,
} from './find.customer.usecase.dto'
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface'
import { UsecaseAbstract } from '../../usecase.abstract'

export class FindCustomerUsecase extends UsecaseAbstract<
    InputFindCustomerUsecaseDTO,
    OutputFindCustomerUsecaseDTO
> {
    constructor(private repository: CustomerRepositoryInterface) {
        super()
    }

    async execute(
        input: InputFindCustomerUsecaseDTO
    ): Promise<OutputFindCustomerUsecaseDTO> {
        const customer = await this.repository.find(input.id)

        return {
            id: customer.id,
            name: customer.name,
            rewardPoints: customer.rewardPoints,
            active: customer.active,
            address: customer.address,
        }
    }
}
