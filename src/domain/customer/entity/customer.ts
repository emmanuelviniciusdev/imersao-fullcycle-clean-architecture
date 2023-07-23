import Address from '../value-object/address'
import CustomerInterface from './customer.interface'
import EntityAbstract from '../../@shared/entity/entity.abstract'
import CustomerValidatorFactory from '../factory/customer.validator.factory'

export default class Customer
    extends EntityAbstract
    implements CustomerInterface
{
    private _id: string
    private _name: string
    private _address?: Address
    private _active: boolean
    private _rewardPoints: number

    constructor(
        id: string,
        name: string,
        address?: Address,
        active?: boolean,
        rewardPoints?: number
    ) {
        super()

        this._id = id
        this._name = name
        this._address = address
        this._active = active ?? false
        this._rewardPoints = rewardPoints ?? 0

        this._validate()

        this.notification.throwNotificationErrorIfHasNotifications('customer')
    }

    activate() {
        if (!this.address) {
            throw new Error(
                'Customer must have an address in order to activate'
            )
        }

        this._active = true
    }

    deactivate() {
        this._active = false
    }

    addRewardPoints(rewardPoints: number) {
        this._rewardPoints += rewardPoints
    }

    changeAddress(address?: Address) {
        this._address = address
    }

    changeName(name: string) {
        this._name = name
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get address(): Address | undefined {
        return this._address
    }

    get active() {
        return this._active
    }

    get rewardPoints() {
        return this._rewardPoints
    }

    private _validate() {
        CustomerValidatorFactory.create().validate(this)
    }
}
