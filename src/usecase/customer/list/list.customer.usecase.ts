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

        const customersOutput = customers.map((c) => ({
            id: c.id,
            name: c.name,
            address: {
                street: c.address.street,
                number: c.address.number,
                zipCode: c.address.zipCode,
                city: c.address.city,
            },
            active: c.active,
            rewardPoints: c.rewardPoints,
        }))

        return {
            customers: customersOutput,
        }
    }
}
