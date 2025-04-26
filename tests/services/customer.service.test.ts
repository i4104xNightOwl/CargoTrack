import { CustomerService } from "@src/services/customer.service";
import { sequelize } from "@src/services/mysql/models";
import { CustomerBuilder } from "@src/models/customer.model";
import nomalizeDate from "../../utils/dateUtils";

describe("Kiểm tra CustomerService", () => {
    beforeAll(async () => {
        await sequelize.authenticate();
    })
    
    beforeEach(async () => {
        await sequelize.drop();
        await sequelize.sync({ force: true });
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it("Kiểm tra get", async () => {
        const customer = CustomerBuilder.new()
            .setName("John Doe")
            .setEmail("john.doe@example.com")
            .setPhone("1234567890").setStatus(1)
            .build();
        
        const customerService = new CustomerService();

        const createdCustomer = await customerService.create(customer);
        const customers = await customerService.get();

        expect(nomalizeDate(customers)).toEqual([nomalizeDate(createdCustomer)]);
    });

    it("Kiểm tra getById", async () => {
        const customer = CustomerBuilder.new()
            .setName("John Doe")
            .setEmail("john.doe@example.com")
            .setPhone("1234567890").setStatus(1)
            .build();
        const customerService = new CustomerService();
        const createdCustomer = await customerService.create(customer);
        const customerById = await customerService.getById(createdCustomer.id);

        expect(nomalizeDate(customerById)).toEqual(nomalizeDate(createdCustomer));
    });

    it("Kiểm tra create", async () => {
        const customer = CustomerBuilder.new()
            .setName("John Doe")
            .setEmail("john.doe@example.com")
            .setPhone("1234567890").setStatus(1)
            .build();
        const customerService = new CustomerService();
        const createdCustomer = await customerService.create(customer);
        const customers = await customerService.get();
        expect(nomalizeDate(customers)).toEqual([nomalizeDate(createdCustomer)]);
    });

    it("Kiểm tra update", async() => {
        const customer = CustomerBuilder.new()
            .setName("John Doe")
            .setEmail("john.doe@example.com")
            .setPhone("1234567890").setStatus(1)
            .build();
        const customerService = new CustomerService();
        const createdCustomer = await customerService.create(customer);
        
        createdCustomer.name = "Jane Doe";
        createdCustomer.email = "jane.doe@example.com";
        const updatedCustomer = await customerService.update(createdCustomer);
        const customerById = await customerService.getById(createdCustomer.id);

        expect(nomalizeDate(customerById)).toEqual(nomalizeDate(updatedCustomer));
    });

    it("Kiểm tra delete", async () => {
        const customerService = new CustomerService();
        const customer = CustomerBuilder.new()
            .setName("John Doe")
            .setEmail("john.doe@example.com")
            .setPhone("1234567890").setStatus(1)
            .build();

        const createdCustomer = await customerService.create(customer);
        const isDeleted = await customerService.delete(createdCustomer);

        const customers = await customerService.get();

        expect(isDeleted).toBe(true);
        expect(customers.length).toBe(0);
    });
})