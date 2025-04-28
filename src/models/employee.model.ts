import { IEmployee } from "@interfaces/models/employee.model";

export class Employee implements IEmployee {
    id: number;
    name: string;
    phone: string;
    email: string;
    role: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

export class EmployeeBuilder {
    private employee: IEmployee;

    private constructor() {
        this.employee = new Employee();
    }

    setName(name: string): EmployeeBuilder {
        this.employee.name = name;
        return this;
    }
    
    setPhone(phone: string): EmployeeBuilder {
        this.employee.phone = phone;
        return this;
    }

    setEmail(email: string): EmployeeBuilder {
        this.employee.email = email;
        return this;
    }

    setRole(role: string): EmployeeBuilder {
        this.employee.role = role;
        return this;
    }
    
    setStatus(status: number): EmployeeBuilder {
        this.employee.status = status;
        return this;
    }

    static new(): EmployeeBuilder { return new EmployeeBuilder(); }
    build(): IEmployee { return this.employee; }
}
    
    
