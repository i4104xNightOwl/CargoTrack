import { TruckStatus } from '../../interfaces/models/truck.model';
import { sequelize } from '../../src/configs/models';
import Truck, { TruckBuilder } from '../../src/models/truck.model';
import TruckService from '../../src/services/truck.service';

describe("Kiểm tra TruckModel", () => {
    beforeAll(async () => {
        await sequelize.authenticate();
    });
    
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    })
    
    afterAll(async () => {
        await sequelize.close();
    })

    it("Kiểm tra changeStatus", async () => {
        const truck = TruckBuilder.new()
            .setLicensePlate("licensePlate")
            .setStatus(TruckStatus.NotUsed);

        const truckService = new TruckService();
        const createdTruck = await truckService.create(truck);

        const getTruck = await truckService.getById(createdTruck.id);
        await getTruck.changeStatus(TruckStatus.IsUsed);

        const getNewTruck = await truckService.getById(createdTruck.id);

        expect(getNewTruck.status).toBe(TruckStatus.IsUsed);
    })
})