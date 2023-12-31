import ProductRepositoryInterface from '../../../../domain/product/repository/product.repository.interface'
import ProductModel from './product.model'
import ProductInterface from '../../../../domain/product/entity/product.interface'
import Product from '../../../../domain/product/entity/product'

export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: ProductInterface): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,
        })
    }

    async find(id: string): Promise<ProductInterface> {
        const productModel = await ProductModel.findOne({ where: { id } })

        if (!productModel) {
            throw new Error(`Product with ID ${id} not found`)
        }

        const productData = productModel.toJSON()

        return new Product(productData.id, productData.name, productData.price)
    }

    async findAll(): Promise<ProductInterface[]> {
        const allProducts = await ProductModel.findAll()
        return allProducts.map((p) => new Product(p.id, p.name, p.price))
    }

    async update(entity: ProductInterface): Promise<void> {
        await ProductModel.update(
            { name: entity.name, price: entity.price },
            { where: { id: entity.id } }
        )
    }
}
