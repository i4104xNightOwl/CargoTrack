import { ICargo } from "@interfaces/models/cargo.model";
import { CargoBuilder } from "@src/models/cargo.model";
import { CargoService } from "@src/services/cargo.service";
import { sequelize } from "@src/services/mysql/models";

describe('Kiểm tra CargoService', () => {
    beforeAll(async () => {
        await sequelize.authenticate();
    })

    beforeEach(async () => {
        await sequelize.drop();
        await sequelize.sync({ force: true });
    })

    afterAll(async () => {
        await sequelize.close();
    })
    
    it("Kiểm tra get", async () => {
        const cargo: ICargo = CargoBuilder.new()
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
            .setTruckId(1)
            .setDriverId(1)
            .setCustomerId(1)
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
            .setPaymentDeposit(100)
            .setNote("Hà Nội")
            .build();

        const cargoService = new CargoService();
        const createdCargo = await cargoService.create(cargo);
        expect(createdCargo.customer.id).toEqual(1);
    })
})