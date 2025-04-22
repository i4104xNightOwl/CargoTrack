import { ITruck } from '@interface/models/truck.model';
import { ITruckService } from '@interface/services/truck.service';
import { TruckDB } from '@src/configs/models/truck.model';
import Truck from '@src/models/truck.model';
import { plainToInstance } from 'class-transformer';

export default class TruckService implements ITruckService {
    async get(): Promise<ITruck[]> {
        const trucks = (await TruckDB.findAll()).map((truck: TruckDB) => {
            return plainToInstance(Truck, truck.dataValues);
        });
        return trucks;
    }

    async getById(id: number): Promise<ITruck> {
        const truck = await TruckDB.findByPk(id);
        if (!truck) throw new Error('Truck not found');
        return plainToInstance(Truck, truck.dataValues);
    }

    async create(item: ITruck): Promise<ITruck> {
        const truck = await TruckDB.create(item);
        return plainToInstance(Truck, truck.dataValues);
    }

    async update(item: ITruck): Promise<ITruck> {
        const truck = await TruckDB.findByPk(item.id);
        if (!truck) throw new Error("Truck not found");
        await truck.update(item)
        return this.getById(item.id);
    }
    
    async delete(item: ITruck): Promise<boolean> {
        const truck = await TruckDB.findByPk(item.id);
        if (!truck) throw new Error("Truck not found");
        await truck.destroy();
        return true;
    }
    
}