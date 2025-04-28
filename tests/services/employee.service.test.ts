import { EmployeeBuilder } from "@src/models/employee.model";
import { EmployeeService } from "@src/services/employee.service";
import { sequelize } from "@src/services/mysql/models";
import nomalizeDate  from "../../utils/dateUtils";

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
            .setPhone("0987654321")
            .setEmail("email@gmail.com")
            .setRole("role")
            .setStatus(1)
            .build();

        const createdEmployee = await employeeService.create(employee);
        const getEmployee = await employeeService.getById(createdEmployee.id);

        expect(nomalizeDate(getEmployee)).toEqual(nomalizeDate(createdEmployee));
    });

    it("Kiểm tra create", async () => {
        const employeeService = new EmployeeService();
        const employee = EmployeeBuilder.new()
            .setName("name")
            .setPhone("0987654321")
            .setEmail("email@gmail.com")
            .setRole("role")
            .setStatus(1)
            .build();

        const createdEmployee = await employeeService.create(employee);
        const getEmployee = await employeeService.getById(createdEmployee.id);

        expect(nomalizeDate(getEmployee)).toEqual(nomalizeDate(createdEmployee));
    });

    it("Kiểm tra update", async () => {
        const employeeService = new EmployeeService();
        const employee = EmployeeBuilder.new()
            .setName("name")
            .setPhone("0987654321")
            .setEmail("email@gmail.com")
            .setRole("role")
            .setStatus(1)
            .build();

        const createdEmployee = await employeeService.create(employee);

        createdEmployee.name = "new name";
        await employeeService.update(createdEmployee);

        const getEmployee = await employeeService.getById(createdEmployee.id);

        expect(getEmployee.name).toEqual("new name");
    });

    it("Kiểm tra delete", async () => {
        const employeeService = new EmployeeService();
        const employee = EmployeeBuilder.new()
            .setName("name")
            .setPhone("0987654321")
            .setEmail("email@gmail.com")
            .setRole("role")
            .setStatus(1)
            .build();

        const createdEmployee = await employeeService.create(employee);

        await employeeService.delete(createdEmployee);

        const getEmployee = await employeeService.get();

        expect(getEmployee.length).toBe(0);
    });
});