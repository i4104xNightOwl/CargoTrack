import { ICustomer } from "@interfaces/models/customer.model";

export default class Customer implements ICustomer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}