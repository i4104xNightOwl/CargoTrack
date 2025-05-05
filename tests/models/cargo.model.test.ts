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
import { TruckService } from "@src/services/truck.service";
import { EmployeeService } from "@src/services/employee.service";
import { CustomerService } from "@src/services/customer.service";
import { FuelCost, CargoItem, AdditionalCost } from "@interfaces/models/cargo.model";
import nomalizeDate from '../../utils/dateUtils';

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

        const truckService = new TruckService();
        const driverService = new EmployeeService();
        const customerService = new CustomerService();

        truck = await truckService.create(
            TruckBuilder.new()
                .setLicensePlate("1234567890")
                .setStatus(TruckStatus.NotUsed)
                .build()
        );
        driver = await driverService.create(
            EmployeeBuilder.new()
                .setName("John Doe")
                .setEmail("john.doe@example.com")
                .setPhone("1234567890")
                .setRole("driver")
                .setStatus(1)
                .build()
        );
        customer = await customerService.create(
            CustomerBuilder.new()
                .setName("John Doe")
                .setEmail("john.doe@example.com")
                .setPhone("1234567890")
                .setStatus(1)
                .build()
        );
    })

    afterAll(async () => {
        await sequelize.drop();
        await sequelize.close();
    });

    it("Kiểm tra addCargoItem", async () => {
        const cargoItem: CargoItem = {
            customer: customer,
            cargoType: "up",
            amount: 100,
            price: 100
        }

        const cargo = CargoBuilder.new()
            .setType("up")
            .setTruck(truck)
            .setDriver(driver)
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

        const newCargoItem: CargoItem = {
            customer: customer,
            cargoType: "up",
            amount: 200,
            price: 130
        }

        await createdCargo.addCargoItem(newCargoItem);
        await createdCargo.save();

        const updatedCargo = await cargoService.getById(createdCargo.id);
        expect(nomalizeDate(updatedCargo.cargoItems)).toEqual(expect.arrayContaining(nomalizeDate([cargoItem, newCargoItem])));
    })

    it("Kiểm tra addFuelCost", async () => {
        const fuelCost: FuelCost = {
            location: "Hà Nội",
            amount: 100
        }

        const cargo = CargoBuilder.new()
            .setType("up")
            .setTruck(truck)
            .setDriver(driver)
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

        const newFuelCost = {
            location: "Hà Nội",
            amount: 200
        }

        await createdCargo.addFuelCost(newFuelCost);
        await createdCargo.save();

        const updatedCargo = await cargoService.getById(createdCargo.id);
        expect(nomalizeDate(updatedCargo.fuelCosts)).toEqual(expect.arrayContaining(nomalizeDate([fuelCost, newFuelCost])));
    })

    it("Kiểm tra addAdditionalCost", async () => {
        const additionalCost: AdditionalCost = {
            amount: 100,
            reason: "Hà Nội"
        }

        const cargo = CargoBuilder.new()
            .setType("up")
            .setTruck(truck)
            .setDriver(driver)
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

        const newAdditionalCost: AdditionalCost = {
            amount: 200,
            reason: "Hà Nội"
        }

        await createdCargo.addAdditionalCost(newAdditionalCost);
        await createdCargo.save();

        const updatedCargo = await cargoService.getById(createdCargo.id);
        expect(nomalizeDate(updatedCargo.additionalCosts)).toEqual(expect.arrayContaining(nomalizeDate([additionalCost, newAdditionalCost])));
    })

    it("Kiểm tra addPaymentDeposit", async () => {
        const paymentDeposit = 100;

        const cargo = CargoBuilder.new()
            .setType("up") 
            .setTruck(truck)
            .setDriver(driver)
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

        await createdCargo.addPaymentDeposit(100);
        await createdCargo.save();

        const updatedCargo = await cargoService.getById(createdCargo.id);
        expect(updatedCargo.paymentDeposit).toEqual(paymentDeposit + 100);
    })
});