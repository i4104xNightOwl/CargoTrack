import { ITruck, TruckStatus } from "@interface/models/truck.model";

export default class Truck implements ITruck {
    id: number;
    licensePlate: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;

    changeStatus(status: TruckStatus): Promise<ITruck> {
        throw new Error('Method not implemented.');
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