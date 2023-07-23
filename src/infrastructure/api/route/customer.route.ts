import { Router, Request, Response } from 'express'
import { CreateCustomerUsecase } from '../../../usecase/customer/create/create.customer.usecase'
import CustomerRepository from '../../customer/repository/sequelize/customer.repository'
import { InputCreateCustomerUsecaseDTO } from '../../../usecase/customer/create/create.customer.usecase.dto'
import { ListCustomerUsecase } from '../../../usecase/customer/list/list.customer.usecase'
import CustomerPresenter from '../presenters/customer.presenter'

export const router = Router()

router.get('/list', async (req: Request, res: Response) => {
    const repository = new CustomerRepository()
    const usecase = new ListCustomerUsecase(repository)

    try {
        const output = await usecase.execute({})

        res.format({
            json: async () => res.status(200).send(output),
            xml: async () =>
                res.status(200).send(CustomerPresenter.listXML(output)),
        })
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/', async (req: Request, res: Response) => {
    const repository = new CustomerRepository()
    const usecase = new CreateCustomerUsecase(repository)

    try {
        const createCustomerDTO: InputCreateCustomerUsecaseDTO = {
            name: req.body.name,
            address: {
                city: req.body.address.city,
                number: req.body.address.number,
                street: req.body.address.street,
                zipCode: req.body.address.zipCode,
            },
            active: true,
        }

        const output = await usecase.execute(createCustomerDTO)

        output.address = {
            city: output.address.city,
            number: output.address.number,
            street: output.address.street,
            zipCode: output.address.zipCode,
        }

        res.status(201).send(output)
    } catch (err) {
        res.status(500).send(err)
    }
})
