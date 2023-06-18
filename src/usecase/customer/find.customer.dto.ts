import Address from '../../domain/customer/value-object/address'

export interface OutputFindCustomerDTO {
    id: string
    name: string
    address?: Address
    active?: boolean
    rewardPoints?: number
}

export interface InputFindCustomerDTO {
    id: string
}
