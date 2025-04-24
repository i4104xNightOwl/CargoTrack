import { CargoBuilder } from "@src/models/cargo.model";
import { sequelize } from "@src/services/mysql/models";

describe('Kiểm tra CargoModel', () => {
    beforeAll(async () => {
        await sequelize.authenticate();
    });

    beforeEach(async () => {
        await sequelize.drop();
        await sequelize.sync({ force: true });
    })

    afterAll(async () => {
        await sequelize.close();
    });

    it("Kiểm tra addCargoItem", async () => {
        const cargoItem = {
            customerId: 1,
            cargoType: "up",
            amount: 100,
            unit: "kg"
        }

        const cargo = CargoBuilder.new()
            .setType("up")
            .setTruckId(1)
            .setDriverId(1)
            .setCustomerId(1)
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
            .setTruckId(1)
            .setDriverId(1)
            .setCustomerId(1)
            .setCargoItems([{ customerId: 1, cargoType: "up", amount: 100, unit: "kg" }])
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
            .setTruckId(1)
            .setDriverId(1)
            .setCustomerId(1)
            .setCargoItems([{ customerId: 1, cargoType: "up", amount: 100, unit: "kg" }])
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
            .setTruckId(1)
            .setDriverId(1)
            .setCustomerId(1)
            .setCargoItems([{ customerId: 1, cargoType: "up", amount: 100, unit: "kg" }])
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