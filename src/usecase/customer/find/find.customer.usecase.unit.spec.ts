import Address from '../../../domain/customer/value-object/address'
import Customer from '../../../domain/customer/entity/customer'
import {
    InputFindCustomerUsecaseDTO,
    OutputFindCustomerUsecaseDTO,
} from './find.customer.usecase.dto'
import { FindCustomerUsecase } from './find.customer.usecase'
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface'

const address = new Address('Street X', '1', '00000-00', 'Montreal')
const customer = new Customer('1', 'Emmanuel Vinícius', address)

describe('FindCustomerUsecase Unit Tests', () => {
    let mockCustomerRepository: CustomerRepositoryInterface

    beforeEach(() => {
        mockCustomerRepository = {
            findAll: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(customer)),
            create: jest.fn(),
            update: jest.fn(),
        }
    })

    it('should find a customer', async () => {
        const input: InputFindCustomerUsecaseDTO = { id: customer.id }

        const usecase = new FindCustomerUsecase(mockCustomerRepository)

        const output = await usecase.execute(input)

        const expectedOutput: OutputFindCustomerUsecaseDTO = {
            id: customer.id,
            name: customer.name,
            address: customer.address,
            rewardPoints: customer.rewardPoints,
            active: customer.active,
        }

        expect(output).toEqual(expectedOutput)
    })

    it('should throw an error if customer was not found', async () => {
        const errorMessage = `Customer with ID ${customer.id} not found`

        mockCustomerRepository.find = jest.fn().mockImplementation(() => {
            throw new Error(errorMessage)
        })

        const input: InputFindCustomerUsecaseDTO = { id: customer.id }

        const usecase = new FindCustomerUsecase(mockCustomerRepository)

        await expect(
            async () => await usecase.execute(input)
        ).rejects.toThrowError(errorMessage)
    })
})
