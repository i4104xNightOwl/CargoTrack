import { IEmployee } from "@interfaces/models/employee.model";
import { IEmployeeService } from "@interfaces/services/employee.service";
import { EmployeeDB } from "./mysql/models/employee.model";
import { plainToInstance } from "class-transformer";
import { Employee } from "@src/models/employee.model";

export class EmployeeService implements IEmployeeService {
    async get(): Promise<IEmployee[]> {
        const employees = (await EmployeeDB.findAll()).map((employee) => {
            return plainToInstance(Employee, employee.dataValues);
        });

        return employees;
    }

    async getById(id: number): Promise<IEmployee> {
        const employee = await EmployeeDB.findByPk(id);
        if (!employee) throw new Error("Employee not found");
        return plainToInstance(Employee, employee.dataValues);
    }

    async create(item: IEmployee): Promise<IEmployee> {
        const employee = await EmployeeDB.create(item);
        return plainToInstance(Employee, employee.dataValues);
    }

    async update(item: IEmployee): Promise<IEmployee> {
        const employee = await EmployeeDB.findByPk(item.id);
        if (!employee) throw new Error("Employee not found");
        await employee.update(item);
        return this.getById(item.id);
    }

    async delete(item: IEmployee): Promise<boolean> {
        const employee = await EmployeeDB.findByPk(item.id);
        if (!employee) throw new Error("Employee not found");
        await employee.destroy();
        return true;
    }
		
}
