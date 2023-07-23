import { OutputListCustomerUsecaseDTO } from '../../../usecase/customer/list/list.customer.usecase.dto'
import { toXML } from 'jstoxml'

export default class CustomerPresenter {
    static listXML(data: OutputListCustomerUsecaseDTO): string {
        const xmlOptions = {
            header: true,
            indent: ' ',
            newLine: '\n',
            allowEmpty: true,
        }

        return toXML(
            {
                customers: data.customers.map((c) => ({
                    id: c.id,
                    name: c.name,
                    address: {
                        street: c.address.street,
                        city: c.address.city,
                        number: c.address.number,
                        zipCode: c.address.zipCode,
                    },
                })),
            },
            xmlOptions
        )
    }
}
