type Address = { street: string; number: string; zipCode: string; city: string }

export interface OutputUpdateCustomerUsecaseDTO {
    id: string
    name: string
    address?: Address
    active?: boolean
    rewardPoints?: number
}

export interface InputUpdateCustomerUsecaseDTO {
    id: string
    name: string
    address?: Address
}
