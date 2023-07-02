import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface'
import Address from '../../../domain/customer/value-object/address'
import Customer from '../../../domain/customer/entity/customer'
import {
    InputUpdateCustomerUsecaseDTO,
    OutputUpdateCustomerUsecaseDTO,
} from './update.customer.usecase.dto'
import { UpdateCustomerUsecase } from './update.customer.usecase'

jest.mock('uuid', () => ({ v4: () => 'random-uuid-v4' }))

const address = new Address('Street X', '1', '00000-00', 'Montreal')
const customer = new Customer('1', 'Emmanuel Vinícius', address)

describe('UpdateCustomerUsecase Unit Tests', () => {
    let mockCustomerRepository: CustomerRepositoryInterface

    beforeEach(() => {
        mockCustomerRepository = {
            findAll: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(customer)),
            create: jest.fn(),
            update: jest.fn(),
        }
    })

    it('should update a customer', async () => {
        const customerNameUpdated = 'Emmanuel Vinícius UPDATED'
        const customerAddressUpdated = new Address(
            'Street Y',
            '2',
            '22222-22',
            'São Paulo'
        )

        const input: InputUpdateCustomerUsecaseDTO = {
            id: customer.id,
            name: customerNameUpdated,
            address: customerAddressUpdated,
        }

        const usecase = new UpdateCustomerUsecase(mockCustomerRepository)

        const output = await usecase.execute(input)

        const expectedOutput: OutputUpdateCustomerUsecaseDTO = {
            id: customer.id,
            name: customerNameUpdated,
            address: customerAddressUpdated,
            active: customer.active,
            rewardPoints: customer.rewardPoints,
        }

        expect(output).toEqual(expectedOutput)
    })
})
