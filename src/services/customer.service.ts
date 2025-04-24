import { ICustomer } from "@interfaces/models/customer.model";
import { ICustomerService } from "@interfaces/services/customer.service";
import Customer from "@src/models/customer.model";
import { CustomerDB } from "./mysql/models/customer.model";
import { plainToInstance } from "class-transformer";

export default class CustomerService implements ICustomerService {

    async get(): Promise<ICustomer[]> {
        const customers = (await CustomerDB.findAll()).map(customer => {
            return plainToInstance(Customer, customer.dataValues);
        });
        return customers;
    }

    async getById(id: number): Promise<ICustomer> {
        const customer = await CustomerDB.findByPk(id);
        return plainToInstance(Customer, customer?.dataValues);
    }

    async create(item: ICustomer): Promise<ICustomer> {
        const customer = await CustomerDB.create(item);
        return plainToInstance(Customer, customer?.dataValues);
    }

    async update(item: ICustomer): Promise<ICustomer> {
        const getCustomer = await this.getById(item.id);
        if (!getCustomer) throw new Error("Customer not found");
        
        await CustomerDB.update(item, { where: { id: item.id } });
        return this.getById(item.id);
    }

    async delete(item: ICustomer): Promise<boolean> {
        const getCustomer = await this.getById(item.id);
        if (!getCustomer) throw new Error("Customer not found");
        await CustomerDB.destroy({ where: { id: item.id } });
        return true;
    }
}
