import ValidatorInterface from '../../@shared/validator/validator.interface'
import * as yup from 'yup'
import Product from '../entity/product'

export default class ProductYupValidator
    implements ValidatorInterface<Product>
{
    validate(entity: Product) {
        try {
            yup.object()
                .shape({
                    id: yup.string().required('ID is required'),
                    name: yup.string().required('Name is required'),
                    price: yup
                        .number()
                        .moreThan(0, 'Price must be greater than 0'),
                })
                .validateSync(
                    { id: entity.id, name: entity.name, price: entity.price },
                    { abortEarly: false }
                )
        } catch (err) {
            const yupError = err as yup.ValidationError

            for (const errorMessage of yupError.errors) {
                entity.notification.add({
                    context: 'product',
                    message: errorMessage,
                })
            }
        }
    }
}
