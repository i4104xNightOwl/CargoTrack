import { ITruck } from '@interface/models/truck.model';
import { ITruckService } from '../../interfaces/services/truck.service';

export default class TruckService implements ITruckService {
    get(): Promise<ITruck[]> {
        throw new Error('Method not implemented.');
    }

    getById(id: number): Promise<ITruck> {
        throw new Error('Method not implemented.');
    }

    create(item: ITruck): Promise<ITruck> {
        throw new Error('Method not implemented.');
    }

    update(item: ITruck): Promise<ITruck> {
        throw new Error('Method not implemented.');
    }
    
    delete(item: ITruck): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    
}