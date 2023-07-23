import ValidatorInterface from '../../@shared/validator/validator.interface'
import Customer from '../entity/customer'
import * as yup from 'yup'

export default class CustomerYupValidator
    implements ValidatorInterface<Customer>
{
    validate(entity: Customer) {
        try {
            yup.object()
                .shape({
                    id: yup.string().required('ID is required'),
                    name: yup.string().required('Name is required'),
                })
                .validateSync(
                    { id: entity.id, name: entity.name },
                    { abortEarly: false }
                )
        } catch (err) {
            const yupError = err as yup.ValidationError

            for (const errorMessage of yupError.errors) {
                entity.notification.add({
                    context: 'customer',
                    message: errorMessage,
                })
            }
        }
    }
}
