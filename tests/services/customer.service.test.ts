import CustomerService from "@src/services/customer.service";
import { sequelize } from "@src/services/mysql/models";
import { CustomerBuilder } from "@src/models/customer.model";

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
        await customerService.create(customer);
        const customers = await customerService.get();
        expect(customers).toEqual([customer]);
    });

    it("Kiểm tra getById", async () => {
        const customer = CustomerBuilder.new()
            .setName("John Doe")
            .setEmail("john.doe@example.com")
            .setPhone("1234567890").setStatus(1)
            .build();
        const customerService = new CustomerService();
        await customerService.create(customer);
        const customerById = await customerService.getById(customer.id);

        expect(customerById).toEqual(customer);
    });

    it("Kiểm tra create", async () => {
        const customer = CustomerBuilder.new()
            .setName("John Doe")
            .setEmail("john.doe@example.com")
            .setPhone("1234567890").setStatus(1)
            .build();
        const customerService = new CustomerService();
        await customerService.create(customer);
        const createdCustomer = await customerService.getById(customer.id);
        expect(createdCustomer).toEqual(customer);
    });

    it("Kiểm tra update", async() => {
        const customer = CustomerBuilder.new()
            .setName("John Doe")
            .setEmail("john.doe@example.com")
            .setPhone("1234567890").setStatus(1)
            .build();
        const customerService = new CustomerService();
        await customerService.create(customer);
        customer.name = "Jane Doe";
        await customerService.update(customer);
        const updatedCustomer = await customerService.getById(customer.id);
        expect(updatedCustomer).toEqual(customer);
    });

    it("Kiểm tra delete", async () => {
        const customer = CustomerBuilder.new()
            .setName("John Doe")
            .setEmail("john.doe@example.com")
            .setPhone("1234567890").setStatus(1)
            .build();
        const customerService = new CustomerService();
        await customerService.create(customer);
        await customerService.delete(customer);
        const customers = await customerService.get();
        expect(customers).toEqual([]);
    });
})