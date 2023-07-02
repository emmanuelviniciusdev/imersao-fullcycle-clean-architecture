import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface'
import Customer from '../../../domain/customer/entity/customer'
import Address from '../../../domain/customer/value-object/address'
import {
    InputListCustomerUsecaseDTO,
    OutputListCustomerUsecaseDTO,
} from './list.customer.usecase.dto'
import { ListCustomerUsecase } from './list.customer.usecase'
import { json } from 'sequelize'

const customers = [
    new Customer(
        '1',
        'Emmanuel Vinícius',
        new Address('Street X', '1', '00000-00', 'Montreal')
    ),
    new Customer(
        '2',
        'Emmanuel',
        new Address('Street Y', '2', '22222-22', 'São Paulo')
    ),
]

describe('ListCustomerUsecase Unit Tests', () => {
    let mockCustomerRepository: CustomerRepositoryInterface

    beforeEach(() => {
        mockCustomerRepository = {
            findAll: jest.fn().mockReturnValue(Promise.resolve(customers)),
            find: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        }
    })

    it('should list customers', async () => {
        const input: InputListCustomerUsecaseDTO = {}

        const usecase = new ListCustomerUsecase(mockCustomerRepository)

        const output = await usecase.execute(input)

        const expectedOutput: OutputListCustomerUsecaseDTO = { customers }

        expect(output.customers).toHaveLength(2)

        for (const customerOutput of output.customers) {
            const customerExpectedOutput = expectedOutput.customers.find(
                (c) => c.id === customerOutput.id
            )

            expect(customerOutput.id).toBe(customerExpectedOutput.id)
            expect(customerOutput.name).toBe(customerExpectedOutput.name)
            expect(customerOutput.active).toBe(customerExpectedOutput.active)
            expect(customerOutput.rewardPoints).toBe(
                customerExpectedOutput.rewardPoints
            )
            expect(customerOutput.address.street).toBe(
                customerExpectedOutput.address.street
            )
        }
    })
})
