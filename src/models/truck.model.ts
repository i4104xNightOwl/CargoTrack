import { ITruck, TruckStatus } from "@interface/models/truck.model";
import TruckService from '../services/truck.service';

export default class Truck implements ITruck {
    id: number;
    licensePlate: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;

    async changeStatus(status: TruckStatus): Promise<ITruck> {
        const truckService = new TruckService();
        this.status = status;
        await truckService.update(this);
        return this;
    }
}

export class TruckBuilder {
    item: Truck;

    private constructor() {
        this.item = new Truck();
    }

    public setLicensePlate(licensePlate: string) {
        this.item.licensePlate = licensePlate;
        return this;
    }

    public setStatus(status: TruckStatus) {
        this.item.status = status;
        return this;
    }

    public static new() { return new TruckBuilder(); }
    public build() { return this.item }

}