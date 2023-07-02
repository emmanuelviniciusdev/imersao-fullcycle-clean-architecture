type Address = { street: string; number: string; zipCode: string; city: string }

export interface OutputCreateCustomerUsecaseDTO {
    id: string
    name: string
    address?: Address
    active?: boolean
    rewardPoints?: number
}

export interface InputCreateCustomerUsecaseDTO {
    name: string
    address?: Address
    active?: boolean
}
