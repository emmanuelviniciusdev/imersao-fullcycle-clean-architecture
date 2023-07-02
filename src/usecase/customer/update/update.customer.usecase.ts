import { UsecaseAbstract } from '../../usecase.abstract'
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface'
import {
    InputUpdateCustomerUsecaseDTO,
    OutputUpdateCustomerUsecaseDTO,
} from './update.customer.usecase.dto'
import Address from '../../../domain/customer/value-object/address'

export class UpdateCustomerUsecase extends UsecaseAbstract<
    InputUpdateCustomerUsecaseDTO,
    OutputUpdateCustomerUsecaseDTO
> {
    constructor(private repository: CustomerRepositoryInterface) {
        super()
    }

    async execute(
        input: InputUpdateCustomerUsecaseDTO
    ): Promise<OutputUpdateCustomerUsecaseDTO> {
        const customer = await this.repository.find(input.id)

        const address = input.address
            ? new Address(
                  input.address.street,
                  input.address.number,
                  input.address.zipCode,
                  input.address.city
              )
            : null

        customer.changeName(input.name)
        customer.changeAddress(address)

        await this.repository.update(customer)

        return {
            id: customer.id,
            name: customer.name,
            address: customer.address,
            active: customer.active,
            rewardPoints: customer.rewardPoints,
        }
    }
}
