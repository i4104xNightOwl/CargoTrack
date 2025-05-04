import { ICargo, CargoItem } from "@interfaces/models/cargo.model";
import { ICargoService } from "@interfaces/services/cargo.service";
import { CargoDB } from "./mysql/models/cargo.model";
import { plainToInstance } from "class-transformer";
import { Cargo } from "@src/models/cargo.model";
import { CustomerDB } from "./mysql/models/customer.model";
import { EmployeeDB } from "./mysql/models/employee.model";
import { TruckDB } from './mysql/models/truck.model';
import { CustomerService } from "./customer.service";
import { Customer } from "@src/models/customer.model";
import { Truck } from "@src/models/truck.model";
import { Employee } from "@src/models/employee.model";

export class CargoService implements ICargoService {

    async get(): Promise<ICargo[]> {
        const cargos = await CargoDB.findAll({ include: [TruckDB, EmployeeDB, CustomerDB] });
        return this.mapCargosToModel(cargos);
    }

    async getById(id: number): Promise<ICargo> {
        const cargo = await CargoDB.findByPk(id, { include: [TruckDB, EmployeeDB, CustomerDB] });
        if (!cargo) throw new Error("Không tìm thấy đơn hàng");
        
        return this.mapCargoToModel(cargo);
    }

    async create(item: ICargo): Promise<ICargo> {
        const planItem = this.prepareCargoDB(item);
        const cargo = await CargoDB.create(planItem);
        return this.getById(cargo.id);
    }

    async update(item: ICargo): Promise<ICargo> {
        const cargo = await CargoDB.findByPk(item.id);
        if (!cargo) throw new Error("Không tìm thấy đơn hàng");

        const planItem = this.prepareCargoDB(item);
        await cargo.update(planItem);
        return this.getById(item.id);
    }
    
    async delete(item: ICargo): Promise<boolean> {
        const cargo = await CargoDB.findByPk(item.id);
        if (!cargo) throw new Error("Không tìm thấy đơn hàng");

        await cargo.destroy();
        return true;
    }
    
    private async mapCargosToModel(cargos: any[]): Promise<ICargo[]> {
        return Promise.all(cargos.map(cargo => this.mapCargoToModel(cargo)));
    }
    
    private async mapCargoToModel(cargo: any): Promise<ICargo> {
        const customerService = new CustomerService();

        cargo.cargoItems = JSON.parse(cargo.cargoItems);
        const cargoItems = await Promise.all(cargo.cargoItems.map(async (item: any) => {
            const customer = await customerService.getById(item.customerId);
            return {
                customer: plainToInstance(Customer, customer),
                cargoType: item.cargoType,
                amount: item.amount,
                price: item.price
            }
        }));

        const cargoItem = plainToInstance(Cargo, cargo.dataValues);
        cargoItem.truck = plainToInstance(Truck, cargo.TruckDB.dataValues);
        cargoItem.driver = plainToInstance(Employee, cargo.EmployeeDB.dataValues);
        cargoItem.cargoItems = cargoItems;
        return cargoItem;
    }
    
    private prepareCargoDB(item: ICargo): any {
        return {
            ...item,
            truckId: item.truck.id,
            driverId: item.driver.id,
            cargoItems: item.cargoItems.map((cargoItem: CargoItem) => ({
                customerId: cargoItem.customer.id,
                cargoType: cargoItem.cargoType,
                amount: cargoItem.amount,
                price: cargoItem.price
            }))
        };
    }
}