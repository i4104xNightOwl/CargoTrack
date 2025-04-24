import { ICustomer } from "@interfaces/models/customer.model";

export default class Customer implements ICustomer {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

export class CustomerBuilder {
    private customer: Customer;

    constructor() { this.customer = new Customer() }
    
    public setName(name: string): CustomerBuilder {
        this.customer.name = name;
        return this;
    }
    
    public setEmail(email: string): CustomerBuilder {
        this.customer.email = email;
        return this;
    }
    
    public setPhone(phone: string): CustomerBuilder {
        this.customer.phone = phone;
        return this;
    }

    public setStatus(status: number): CustomerBuilder {
        this.customer.status = status;
        return this;
    }

    public build(): ICustomer { return this.customer }
    public static new(): CustomerBuilder { return new CustomerBuilder() }
}