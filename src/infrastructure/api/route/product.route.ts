import { Router, Request, Response } from 'express'
import ProductRepository from '../../product/repository/sequelize/product.repository'
import { ListProductUsecase } from '../../../usecase/product/list/list.product.usecase'
import { CreateProductUsecase } from '../../../usecase/product/create/create.product.usecase'
import { InputCreateProductUsecaseDTO } from '../../../usecase/product/create/create.product.usecase.dto'

export const router = Router()

router.get('/list', async (req: Request, res: Response) => {
    const repository = new ProductRepository()
    const usecase = new ListProductUsecase(repository)

    try {
        const output = await usecase.execute({})
        res.status(200).send(output)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/', async (req: Request, res: Response) => {
    const repository = new ProductRepository()
    const usecase = new CreateProductUsecase(repository)

    try {
        const createProductDTO: InputCreateProductUsecaseDTO = {
            name: req.body.name,
            price: req.body.price,
        }

        const output = await usecase.execute(createProductDTO)

        res.status(201).send(output)
    } catch (err) {
        res.status(500).send(err)
    }
})
