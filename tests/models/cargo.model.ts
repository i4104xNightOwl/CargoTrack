import { CargoBuilder } from "@src/models/cargo.model";
import { Employee } from "@src/models/employee.model";
import { Truck } from "@src/models/truck.model";
import { Customer } from "@src/models/customer.model";
import { TruckBuilder } from "@src/models/truck.model";
import { EmployeeBuilder } from "@src/models/employee.model";
import { CustomerBuilder } from "@src/models/customer.model";
import { sequelize } from "@src/services/mysql/models";
import { TruckStatus } from "@interfaces/models/truck.model";
import { CargoService } from "@src/services/cargo.service";

describe('Kiểm tra CargoModel', () => {
    let truck: Truck;
    let driver: Employee;
    let customer: Customer;

    beforeAll(async () => {
        await sequelize.authenticate();
    });

    beforeEach(async () => {
        await sequelize.drop();
        await sequelize.sync({ force: true });

        truck = await TruckBuilder.new().setLicensePlate("1234567890").setStatus(TruckStatus.NotUsed).build();
        driver = await EmployeeBuilder.new().build();
        customer = await CustomerBuilder.new().build();
    })

    afterAll(async () => {
        await sequelize.close();
    });

    it("Kiểm tra addCargoItem", async () => {
        const cargoItem = {
            customer: customer,
            cargoType: "up",
            amount: 100,
            price: 100
        }

        const cargo = CargoBuilder.new()
            .setType("up")
            .setTruck(truck)
            .setDriver(driver)
            .setCustomer(customer)
            .setCargoItems([cargoItem])
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

        expect(createdCargo.cargoItems).toEqual([cargoItem]);
    })

    it("Kiểm tra addFuelCost", async () => {
        const fuelCost = {
            location: "Hà Nội",
            amount: 100
        }

        const cargo = CargoBuilder.new()
            .setType("up")
            .setTruck(truck)
            .setDriver(driver)
            .setCustomer(customer)
            .setCargoItems([{ customer: customer, cargoType: "up", amount: 100, price: 100 }])
            .setInitialCost(100)
            .setCargoCost(100)
            .setLoadingCost(100)
            .setUnloadingCost(100)
            .setTransportCost(100)
            .setEmployeeCost(100)
            .setFuelCosts([fuelCost])
            .setAdditionalCosts([{ amount: 100, reason: "Hà Nội" }])
            .setPaymentDeposit(100)
            .setNote("Hà Nội")
            .build();

        const cargoService = new CargoService();
        const createdCargo = await cargoService.create(cargo);

        expect(createdCargo.fuelCosts).toEqual([fuelCost]);
    })

    it("Kiểm tra addAdditionalCost", async () => {
        const additionalCost = {
            amount: 100,
            reason: "Hà Nội"
        }

        const cargo = CargoBuilder.new()
            .setType("up")
            .setTruck(truck)
            .setDriver(driver)
            .setCustomer(customer)
            .setCargoItems([{ customer: customer, cargoType: "up", amount: 100, price: 100 }])
            .setInitialCost(100)
            .setCargoCost(100)
            .setLoadingCost(100)
            .setUnloadingCost(100)
            .setTransportCost(100)
            .setEmployeeCost(100)
            .setFuelCosts([{ location: "Hà Nội", amount: 100 }])
            .setAdditionalCosts([additionalCost])
            .setPaymentDeposit(100)
            .setNote("Hà Nội")
            .build();

        const cargoService = new CargoService();
        const createdCargo = await cargoService.create(cargo);

        expect(createdCargo.additionalCosts).toEqual([additionalCost]);
    })

    it("Kiểm tra addPaymentDeposit", async () => {
        const paymentDeposit = 100;

        const cargo = CargoBuilder.new()
            .setType("up") 
            .setTruck(truck)
            .setDriver(driver)
            .setCustomer(customer)
            .setCargoItems([{ customer: customer, cargoType: "up", amount: 100, price: 100 }])
            .setInitialCost(100)
            .setCargoCost(100)
            .setLoadingCost(100)
            .setUnloadingCost(100)
            .setTransportCost(100)
            .setEmployeeCost(100)
            .setFuelCosts([{ location: "Hà Nội", amount: 100 }])
            .setAdditionalCosts([{ amount: 100, reason: "Hà Nội" }])
            .setPaymentDeposit(paymentDeposit)
            .setNote("Hà Nội")
            .build();

        const cargoService = new CargoService();
        const createdCargo = await cargoService.create(cargo);

        expect(createdCargo.paymentDeposit).toEqual(paymentDeposit);
    })
});