import { EmployeeService } from "@src/services/employee.service";
import { sequelize } from "@src/services/mysql/models";

describe("Kiểm tra EmployeeService", () => {
    beforeAll(async () => {
        await sequelize.authenticate();
    });
    
    beforeEach(async () => {
        await sequelize.drop();
        await sequelize.sync({ force: true });
    })
    
    afterAll(async () => {
        await sequelize.close();
    })

    it("Kiểm tra get", async () => {
        const employeeService = new EmployeeService();
        const employees = await employeeService.get();

        expect(employees.length).toBe(0);
    });

    it("Kiểm tra getById", async () => {
        const employeeService = new EmployeeService();
        const employee = EmployeeBuilder.new()
            .setName("name")
            .setPhone("phone")
            .setEmail("email")
            .setRole("role")
            .build();

        const createdEmployee = await employeeService.create(employee);
        const getEmployee = await employeeService.getById(createdEmployee.id);

        expect(getEmployee).toEqual(createdEmployee);
    });

    it("Kiểm tra create", async () => {
        const employeeService = new EmployeeService();
        const employee = EmployeeBuilder.new()
            .setName("name")
            .setPhone("phone")
            .setEmail("email")
            .setRole("role")
            .build();

        const createdEmployee = await employeeService.create(employee);

        expect(createdEmployee).toEqual(employee);
    });

    it("Kiểm tra update", async () => {
        const employeeService = new EmployeeService();
        const employee = EmployeeBuilder.new()
            .setName("name")
            .setPhone("phone")
            .setEmail("email")
            .setRole("role")
            .build();

        const createdEmployee = await employeeService.create(employee);

        createdEmployee.name = "new name";
        createdEmployee.phone = "new phone";
        createdEmployee.email = "new email";
        createdEmployee.role = "new role";

        await employeeService.update(createdEmployee);

        const getEmployee = await employeeService.getById(createdEmployee.id);

        expect(getEmployee).toEqual(createdEmployee);
    });

    it("Kiểm tra delete", async () => {
        const employeeService = new EmployeeService();
        const employee = EmployeeBuilder.new()
            .setName("name")
            .setPhone("phone")
            .setEmail("email")
            .setRole("role")
            .build();

        const createdEmployee = await employeeService.create(employee);

        await employeeService.delete(createdEmployee);

        const getEmployee = await employeeService.get();

        expect(getEmployee.length).toBe(0);
    });
});