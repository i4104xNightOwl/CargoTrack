import { ICargo, CargoItem, FuelCost, AdditionalCost } from "@interfaces/models/cargo.model";
import { ICustomer } from "@interfaces/models/customer.model";
import { IEmployee } from "@interfaces/models/employee.model";
import { ITruck } from "@interfaces/models/truck.model";

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

    addCargoItem(cargoItem: CargoItem): Promise<ICargo> {
        throw new Error("Method not implemented.");
    }
    addFuelCost(fuelCost: FuelCost): Promise<ICargo> {
        throw new Error("Method not implemented.");
    }
    addAdditionalCost(additionalCost: AdditionalCost): Promise<ICargo> {
        throw new Error("Method not implemented.");
    }
    addPaymentDeposit(paymentDeposit: number): Promise<ICargo> {
        throw new Error("Method not implemented.");
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