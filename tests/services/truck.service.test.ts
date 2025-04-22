import { TruckStatus } from "../../interfaces/models/truck.model";
import { sequelize } from "../../src/configs/models";
import { TruckBuilder } from "../../src/models/truck.model";
import TruckService from "../../src/services/truck.service";
import nomalizeDate from "../../utils/dateUtils";

describe("Kiểm tra TruckService", () => {
    beforeAll(async () => {
        await sequelize.authenticate();
    })

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    })
    
    afterAll(async () => {
        await sequelize.close();
    })
    
    it("Kiểm tra get", async () => {
        const truck = TruckBuilder.new()
            .setLicensePlate("licensePlate")
            .setStatus(TruckStatus.NotUsed).build();    

        const truckService = new TruckService();
        const createdTruck = await truckService.create(truck);
        const getTruck = await truckService.get();

        expect(getTruck.length).toBeGreaterThan(0);
        expect(nomalizeDate(getTruck)).toEqual(nomalizeDate([createdTruck]));
    });

    it("Kiểm tra getById", async () => {
        const truck = TruckBuilder.new()
            .setLicensePlate("licensePlate")
            .setStatus(TruckStatus.NotUsed).build();

        const truckService = new TruckService();
        const createdTruck = await truckService.create(truck);

        const getTruck = await truckService.getById(createdTruck.id);

        expect(nomalizeDate(getTruck)).toEqual(nomalizeDate(createdTruck));
    });

    it("Kiểm tra create", async () => {
        const truck = TruckBuilder.new()
            .setLicensePlate("licensePlate")
            .setStatus(TruckStatus.NotUsed).build();

        const truckService = new TruckService();
        const createdTruck = await truckService.create(truck);

        expect(createdTruck.licensePlate).toEqual(truck.licensePlate);
        expect(createdTruck.status).toEqual(truck.status);
    });

    it("Kiểm tra update", async () => {
        const truck = TruckBuilder.new()
            .setLicensePlate("licensePlate")
            .setStatus(TruckStatus.NotUsed).build();

        const truckService = new TruckService();
        const createdTruck = await truckService.create(truck);

        createdTruck.licensePlate = "new licensePlate";
        createdTruck.status = TruckStatus.IsUsed;
        await truckService.update(createdTruck);

        const getTruck = await truckService.getById(createdTruck.id);

        expect(getTruck.licensePlate).toEqual("new licensePlate");
        expect(getTruck.status).toEqual(TruckStatus.IsUsed);
    });

    it("Kiểm tra delete", async () => {
        const truck = TruckBuilder.new()
            .setLicensePlate("licensePlate")
            .setStatus(TruckStatus.NotUsed).build();

        const truckService = new TruckService();
        const createdTruck = await truckService.create(truck);

        await truckService.delete(createdTruck);

        const getTruck = await truckService.get();

        expect(getTruck.length).toEqual(0);
    });
})