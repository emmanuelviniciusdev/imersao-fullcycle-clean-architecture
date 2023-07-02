import { UsecaseAbstract } from '../../usecase.abstract'
import {
    InputListCustomerUsecaseDTO,
    OutputListCustomerUsecaseDTO,
} from './list.customer.usecase.dto'
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface'

export class ListCustomerUsecase extends UsecaseAbstract<
    InputListCustomerUsecaseDTO,
    OutputListCustomerUsecaseDTO
> {
    constructor(private repository: CustomerRepositoryInterface) {
        super()
    }

    async execute(
        input: InputListCustomerUsecaseDTO
    ): Promise<OutputListCustomerUsecaseDTO> {
        const customers = await this.repository.findAll()
        return { customers }
    }
}
