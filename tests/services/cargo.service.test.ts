import { ICargo } from "@interfaces/models/cargo.model";
import { IEmployee } from "@interfaces/models/employee.model";
import { ICustomer } from "@interfaces/models/customer.model";
import { ITruck } from "@interfaces/models/truck.model";
import { CargoBuilder } from "@src/models/cargo.model";
import { CargoService } from "@src/services/cargo.service";
import { sequelize } from "@src/services/mysql/models";
import { TruckBuilder } from "@src/models/truck.model";
import { EmployeeBuilder } from "@src/models/employee.model";
import { CustomerBuilder } from "@src/models/customer.model";
import TruckService from "@src/services/truck.service";

describe('Kiểm tra CargoService', () => {
    let truck: ITruck;
    let driver: IEmployee;
    let customer: ICustomer;

    beforeAll(async () => {
        await sequelize.authenticate();
    })

    beforeEach(async () => {
        await sequelize.drop();
        await sequelize.sync({ force: true });

        const truckService = new TruckService();
        const driverService = new EmployeeService();
        const customerService = new CustomerService();

        truck = await truckService.create(TruckBuilder.new().build());
        driver = await driverService.create(EmployeeBuilder.new().build());
        customer = await customerService.create(CustomerBuilder.new().build());
    })

    afterAll(async () => {
        await sequelize.close();
    })
    
    it("Kiểm tra get", async () => {
        const cargo: ICargo = CargoBuilder.new()
            .setType("up")
            .setTruck(truck)
            .setDriver(driver)
            .setCustomer(customer)
            .setCargoItems([{ customerId: 1, cargoType: "up", amount: 100, unit: "kg" }])
            .setInitialCost(100)
            .setCargoCost(100)
            .setLoadingCost(100)
            .setUnloadingCost(100)
            .setTransportCost(100)
            .setEmployeeCost(100)
            .setFuelCosts([{ location: "Hà Nội", amount: 100 }])
            .setAdditionalCosts([{ amount: 100, reason: "Hà Nội" }])
            .setPaymentDeposit(100)
            .setNote("Hà Nội")
            .build();

        const cargoService = new CargoService();
        const createdCargo = await cargoService.create(cargo);
        
        expect(createdCargo.customer.id).toEqual(1);
    })

    it("Kiểm tra getById", async () => {
        const cargo: ICargo = CargoBuilder.new()
            .setType("up")
            .setTruck(truck)
            .setDriver(driver)
            .setCustomer(customer)
            .setCargoItems([{ customerId: 1, cargoType: "up", amount: 100, unit: "kg" }])
            .setInitialCost(100)
            .setCargoCost(100)
            .setLoadingCost(100)
            .setUnloadingCost(100)
            .setTransportCost(100)
            .setEmployeeCost(100)
            .setFuelCosts([{ location: "Hà Nội", amount: 100 }])
            .setAdditionalCosts([{ amount: 100, reason: "Hà Nội" }])
            .setPaymentDeposit(100)
            .setNote("Hà Nội")
            .build();

        const cargoService = new CargoService();
        const createdCargo = await cargoService.create(cargo);
        
        expect(createdCargo.customer.id).toEqual(1);
    })

    it("Kiểm tra create", async () => {
        const cargo: ICargo = CargoBuilder.new()
            .setType("up")
            .setTruck(truck)
            .setDriver(driver)
            .setCustomer(customer)
            .setCargoItems([{ customerId: 1, cargoType: "up", amount: 100, unit: "kg" }])
            .setInitialCost(100)
            .setCargoCost(100)
            .setLoadingCost(100)
            .setUnloadingCost(100)
            .setTransportCost(100)
            .build();
        const cargoService = new CargoService();
        const createdCargo = await cargoService.create(cargo);
        expect(createdCargo.customer.id).toEqual(1);
    })

    it("Kiểm tra update", async () => {
        const cargo: ICargo = CargoBuilder.new()
            .setType("up")
            .setTruck(truck)
            .setDriver(driver)
            .setCustomer(customer)
            .setCargoItems([{ customerId: 1, cargoType: "up", amount: 100, unit: "kg" }])
            .setInitialCost(100)
            .setCargoCost(100)
            .setLoadingCost(100)
            .setUnloadingCost(100)
            .setTransportCost(100)
            .setEmployeeCost(100)
            .setFuelCosts([{ location: "Hà Nội", amount: 100 }])
            .setAdditionalCosts([{ amount: 100, reason: "Hà Nội" }])
            .setPaymentDeposit(100)
            .setNote("Hà Nội")
            .build();

        const cargoService = new CargoService();
        const createdCargo = await cargoService.create(cargo);
        expect(createdCargo.customer.id).toEqual(1);
    })

    it("Kiểm tra delete", async () => {
        const cargo: ICargo = CargoBuilder.new()
            .setType("up")
            .setTruck(truck)
            .setDriver(driver)
            .setCustomer(customer)
            .setCargoItems([{ customerId: 1, cargoType: "up", amount: 100, unit: "kg" }])
            .setInitialCost(100)
            .setCargoCost(100)
            .setLoadingCost(100)
            .setUnloadingCost(100)
            .setTransportCost(100)
            .setEmployeeCost(100)
            .setFuelCosts([{ location: "Hà Nội", amount: 100 }])
            .setAdditionalCosts([{ amount: 100, reason: "Hà Nội" }])
            .setPaymentDeposit(100)
            .setNote("Hà Nội")
            .build();

        const cargoService = new CargoService();
        const createdCargo = await cargoService.create(cargo);
        expect(createdCargo.customer.id).toEqual(1);
    })
})