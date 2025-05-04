import { ICargo, CargoItem, FuelCost, AdditionalCost } from "@interfaces/models/cargo.model";
import { ICustomer } from "@interfaces/models/customer.model";
import { IEmployee } from "@interfaces/models/employee.model";
import { ITruck } from "@interfaces/models/truck.model";
import { CustomerService } from "@src/services/customer.service";
import { CargoService } from "@src/services/cargo.service";
export class Cargo implements ICargo {
    id: number;
    type: string;
    truck: ITruck;
    driver: IEmployee;
    customer: ICustomer;
    cargoItems: CargoItem[];
    initialCost: number;
    cargoCost: number;
    loadingCost: number;
    unloadingCost: number;
    transportCost: number;
    employeeCost: number;
    fuelCosts: FuelCost[];
    additionalCosts: AdditionalCost[];
    paymentDeposit: number;
    note: string;
    createdAt: Date;
    updatedAt: Date;

    async addCargoItem(cargoItem: CargoItem): Promise<ICargo> {
        let customerService = new CustomerService();
        if (!cargoItem.customer) throw new Error("Customer is required");
        let customer = await customerService.getById(cargoItem.customer.id);
        if (!customer) throw new Error("Customer not found");

        this.cargoItems.push(cargoItem);
        return this;
    }

    async addFuelCost(fuelCost: FuelCost): Promise<ICargo> {
        this.fuelCosts.push(fuelCost);
        return this;
    }
    
    async addAdditionalCost(additionalCost: AdditionalCost): Promise<ICargo> {
        this.additionalCosts.push(additionalCost);
        return this;
    }

    async addPaymentDeposit(paymentDeposit: number): Promise<ICargo> {
        this.paymentDeposit = paymentDeposit;
        return this;
    }

    async save(): Promise<ICargo> {
        let cargoService = new CargoService();
        await cargoService.update(this);
        return this;
    }
}

export class CargoBuilder {
    private cargo: Cargo;
    constructor() { this.cargo = new Cargo() }

    public setType(type: string) {
        this.cargo.type = type;
        return this;
    }

    public setTruck(truck: ITruck) {
        this.cargo.truck = truck;
        return this;
    }

    public setDriver(driver: IEmployee) {
        this.cargo.driver = driver;
        return this;
    }
    
    public setCustomer(customer: ICustomer) {
        this.cargo.customer = customer;
        return this;
    }

    public setCargoItems(cargoItems: CargoItem[]) {
        this.cargo.cargoItems = cargoItems;
        return this;
    }

    public setInitialCost(initialCost: number) {
        this.cargo.initialCost = initialCost;
        return this;
    }

    public setCargoCost(cargoCost: number) {
        this.cargo.cargoCost = cargoCost;
        return this;
    }

    public setLoadingCost(loadingCost: number) {
        this.cargo.loadingCost = loadingCost;
        return this;
    }

    public setUnloadingCost(unloadingCost: number) {
        this.cargo.unloadingCost = unloadingCost;
        return this;
    }
    
    public setTransportCost(transportCost: number) {
        this.cargo.transportCost = transportCost;
        return this;
    }

    public setEmployeeCost(employeeCost: number) {
        this.cargo.employeeCost = employeeCost;
        return this;
    }

    public setFuelCosts(fuelCosts: FuelCost[]) {
        this.cargo.fuelCosts = fuelCosts;
        return this;
    }

    public setAdditionalCosts(additionalCosts: AdditionalCost[]) {
        this.cargo.additionalCosts = additionalCosts;
        return this;
    }

    public setPaymentDeposit(paymentDeposit: number) {
        this.cargo.paymentDeposit = paymentDeposit;
        return this;
    }

    public setNote(note: string) {
        this.cargo.note = note;
        return this;
    }

    public setCreatedAt(createdAt: Date) {
        this.cargo.createdAt = createdAt;
        return this;
    }

    public setUpdatedAt(updatedAt: Date) {
        this.cargo.updatedAt = updatedAt;
        return this;
    }
    
    public static new() { return new CargoBuilder() }
    public build() { return this.cargo }
}