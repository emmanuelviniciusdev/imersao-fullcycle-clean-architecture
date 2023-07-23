import Product from './product'

describe('Product Unit Tests', () => {
    it('should throw an error if ID, name and price are empty or invalid', () => {
        expect(() => new Product('', '', 0)).toThrowError(
            'product: ID is required, product: Name is required, product: Price must be greater than 0'
        )
    })

    it('should throw an error if ID is empty', () => {
        expect(() => new Product('', 'Pumpkin', 1.2)).toThrowError(
            'product: ID is required'
        )
    })

    it('should throw an error if name is empty', () => {
        expect(() => new Product('1', '', 0)).toThrowError(
            'product: Name is required'
        )
    })

    it('should throw an error if price is not greater than 0', () => {
        expect(() => new Product('1', 'Pumpkin', 0)).toThrowError(
            'product: Price must be greater than 0'
        )

        expect(() => new Product('1', 'Pumpkin', -1.5)).toThrowError(
            'product: Price must be greater than 0'
        )
    })
})
