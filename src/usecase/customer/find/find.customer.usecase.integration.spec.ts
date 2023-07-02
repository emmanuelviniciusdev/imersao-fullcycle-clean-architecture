import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository'
import Customer from '../../../domain/customer/entity/customer'
import Address from '../../../domain/customer/value-object/address'
import {
    InputFindCustomerUsecaseDTO,
    OutputFindCustomerUsecaseDTO,
} from './find.customer.usecase.dto'
import { FindCustomerUsecase } from './find.customer.usecase'

describe('FindCustomerUsecase Integration Tests', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })

        sequelize.addModels([CustomerModel])

        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should find a customer', async () => {
        const address = new Address('Street X', '1', '00000-00', 'Montreal')
        const customer = new Customer('1', 'Emmanuel Vinícius', address)

        const repository = new CustomerRepository()
        await repository.create(customer)

        const input: InputFindCustomerUsecaseDTO = { id: customer.id }

        const usecase = new FindCustomerUsecase(repository)

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
})
