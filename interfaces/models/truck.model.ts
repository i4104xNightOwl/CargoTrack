export enum TruckStatus {
    NotUsed = 0,
    IsUsed = 1,
}

export interface ITruck {
    id: number;
    licensePlate: string;
    status: TruckStatus;
    createdAt: Date;
    updatedAt: Date;
}