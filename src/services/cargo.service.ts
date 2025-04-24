import { ICargo } from "@interfaces/models/cargo.model";
import { ICargoService } from "@interfaces/services/cargo.service";

export class CargoService implements ICargoService {

    get(): Promise<ICargo[]> {
        throw new Error("Method not implemented.");
    }

    getById(id: number): Promise<ICargo> {
        throw new Error("Method not implemented.");
    }

    create(item: ICargo): Promise<ICargo> {
        throw new Error("Method not implemented.");
    }

    update(item: ICargo): Promise<ICargo> {
        throw new Error("Method not implemented.");
    }
    
    delete(item: ICargo): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}