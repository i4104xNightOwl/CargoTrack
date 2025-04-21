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

    /**
     * Thay đổi trạng thái của xe hàng
     * 
     * @param status Trạng thái mới
     *  
     * @returns Promise<ITruck>
     */
    changeStatus(status: TruckStatus): Promise<ITruck>
}