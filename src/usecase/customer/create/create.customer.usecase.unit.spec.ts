import Address from '../../../domain/customer/value-object/address'
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface'
import {
    InputCreateCustomerUsecaseDTO,
    OutputCreateCustomerUsecaseDTO,
} from './create.customer.usecase.dto'
import { CreateCustomerUsecase } from './create.customer.usecase'
import Customer from '../../../domain/customer/entity/customer'

const address = new Address('Street X', '1', '00000-00', 'Montreal')
const activatedCustomer = new Customer('1', 'Emmanuel Vinícius', address, true)

jest.mock('uuid', () => ({ v4: () => 'random-uuid-v4' }))

describe('CreateCustomerUsecase Unit Tests', () => {
    let mockCustomerRepository: CustomerRepositoryInterface

    beforeEach(() => {
        mockCustomerRepository = {
            findAll: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(activatedCustomer)),
            create: jest.fn(),
            update: jest.fn(),
        }
    })

    it('should throw an error when the customer is active but address is missing', async () => {
        const input: InputCreateCustomerUsecaseDTO = {
            name: activatedCustomer.name,
            address: null,
            active: true,
        }

        const usecase = new CreateCustomerUsecase(mockCustomerRepository)

        await expect(usecase.execute(input)).rejects.toThrowError(
            'The address must be specified when the customer is active'
        )
    })

    it('should throw an error when name is missing', async () => {
        const input: InputCreateCustomerUsecaseDTO = {
            name: '',
            address,
            active: true,
        }

        const usecase = new CreateCustomerUsecase(mockCustomerRepository)

        await expect(usecase.execute(input)).rejects.toThrowError(
            'Name is required'
        )
    })

    it('should create a customer', async () => {
        const input: InputCreateCustomerUsecaseDTO = {
            name: activatedCustomer.name,
            address,
            active: true,
        }

        const usecase = new CreateCustomerUsecase(mockCustomerRepository)

        const output = await usecase.execute(input)

        const expectedOutput: OutputCreateCustomerUsecaseDTO = {
            id: expect.any(String),
            name: activatedCustomer.name,
            address,
            active: true,
            rewardPoints: 0,
        }

        expect(output).toEqual(expectedOutput)
    })
})
