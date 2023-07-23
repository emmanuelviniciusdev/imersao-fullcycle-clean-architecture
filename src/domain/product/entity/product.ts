import ProductInterface from './product.interface'
import EntityAbstract from '../../@shared/entity/entity.abstract'

export default class Product
    extends EntityAbstract
    implements ProductInterface
{
    private _id: string
    private _name: string
    protected _price: number

    constructor(id: string, name: string, price: number) {
        super()

        this._id = id
        this._name = name
        this._price = price

        this._validate()

        this.notification.throwNotificationErrorIfHasNotifications('product')
    }

    changeName(name: string) {
        this._name = name
    }

    changePrice(price: number) {
        this._price = price
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    get price() {
        return this._price
    }

    private _validate() {
        if (!this._id) {
            this.notification.add({
                context: 'product',
                message: 'ID is required',
            })
        }

        if (!this._name) {
            this.notification.add({
                context: 'product',
                message: 'Name is required',
            })
        }

        if (this._price <= 0) {
            this.notification.add({
                context: 'product',
                message: 'Price must be greater than 0',
            })
        }
    }
}
