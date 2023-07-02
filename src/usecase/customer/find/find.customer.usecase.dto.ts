export interface OutputFindCustomerUsecaseDTO {
    id: string
    name: string
    address?: { street: string; number: string; zipCode: string; city: string }
    active?: boolean
    rewardPoints?: number
}

export interface InputFindCustomerUsecaseDTO {
    id: string
}
