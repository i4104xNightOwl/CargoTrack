import { ICustomer } from "@interfaces/models/customer.model";
import { ICustomerService } from "@interfaces/services/customer.service";

export default class CustomerService implements ICustomerService {

    get(): Promise<ICustomer[]> {
        throw new Error("Method not implemented.");
    }

    getById(id: number): Promise<ICustomer> {
        throw new Error("Method not implemented.");
    }

    create(item: ICustomer): Promise<ICustomer> {
        throw new Error("Method not implemented.");
    }

    update(item: ICustomer): Promise<ICustomer> {
        throw new Error("Method not implemented.");
    }

    delete(item: ICustomer): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
