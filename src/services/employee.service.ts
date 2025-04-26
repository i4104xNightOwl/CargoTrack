import { IEmployee } from "@interfaces/models/employee.model";
import { IEmployeeService } from "@interfaces/services/employee.service";

export class EmployeeService implements IEmployeeService {
    get(): Promise<IEmployee[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<IEmployee> {
        throw new Error("Method not implemented.");
    }
    create(item: IEmployee): Promise<IEmployee> {
        throw new Error("Method not implemented.");
    }
    update(item: IEmployee): Promise<IEmployee> {
        throw new Error("Method not implemented.");
    }
    delete(item: IEmployee): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
		
}
