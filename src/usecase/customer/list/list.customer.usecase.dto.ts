type Address = { street: string; number: string; zipCode: string; city: string }

type Customer = {
    id: string
    name: string
    address?: Address
    active?: boolean
    rewardPoints?: number
}

export interface OutputListCustomerUsecaseDTO {
    customers: Customer[]
}

export interface InputListCustomerUsecaseDTO {}
