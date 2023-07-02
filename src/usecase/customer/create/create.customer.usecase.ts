import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface'
import {
    InputCreateCustomerUsecaseDTO,
    OutputCreateCustomerUsecaseDTO,
} from './create.customer.usecase.dto'
import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import Address from '../../../domain/customer/value-object/address'
import { UsecaseAbstract } from '../../usecase.abstract'

export class CreateCustomerUsecase extends UsecaseAbstract<
    InputCreateCustomerUsecaseDTO,
    OutputCreateCustomerUsecaseDTO
> {
    constructor(private repository: CustomerRepositoryInterface) {
        super()
    }

    async execute(
        input: InputCreateCustomerUsecaseDTO
    ): Promise<OutputCreateCustomerUsecaseDTO> {
        const mustThrowRequiredAddressWhenCustomerActiveError =
            input.active && !input.address

        if (mustThrowRequiredAddressWhenCustomerActiveError) {
            throw new Error(
                'The address must be specified when the customer is active'
            )
        }

        const address = input.address
            ? new Address(
                  input.address.street,
                  input.address.number,
                  input.address.zipCode,
                  input.address.city
              )
            : null

        const customer = input.active
            ? CustomerFactory.createActivatedCustomer(input.name, address)
            : CustomerFactory.createDeactivatedCustomer(input.name)

        await this.repository.create(customer)

        const foundCustomer = await this.repository.find(customer.id)

        return {
            id: foundCustomer.id,
            name: foundCustomer.name,
            address: foundCustomer.address,
            rewardPoints: foundCustomer.rewardPoints,
            active: foundCustomer.active,
        }
    }
}
