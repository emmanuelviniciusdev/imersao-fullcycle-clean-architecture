import RepositoryInteface from '../../@shared/repository/repository.interface'
import CustomerInterface from '../entity/customer.interface'

export default interface CustomerRepositoryInterface
    extends RepositoryInteface<CustomerInterface> {}
