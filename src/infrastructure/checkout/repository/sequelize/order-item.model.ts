import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import OrderModel from './order.model'
import ProductModel from '../../../product/repository/sequelize/product.model'

@Table({ tableName: 'tb_order_item', timestamps: false })
export default class OrderItemModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    declare order_id: string

    @BelongsTo(() => OrderModel)
    declare order: OrderModel

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false })
    declare product_id: string

    @BelongsTo(() => ProductModel)
    declare product: ProductModel

    @Column({ allowNull: false })
    declare name: string

    @Column({ allowNull: false })
    declare price: number

    @Column({ allowNull: false })
    declare quantity: number
}
