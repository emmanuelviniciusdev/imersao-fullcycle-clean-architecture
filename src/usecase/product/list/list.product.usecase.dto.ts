type Product = {
    id: string
    name: string
    price: number
}

export interface OutputListProductUsecaseDTO {
    products: Product[]
}

export interface InputListProductUsecaseDTO {}
