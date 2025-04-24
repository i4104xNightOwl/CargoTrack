import { ITruck } from "./truck.model";
import { ICustomer } from './customer.model';
import { IEmployee } from './employee.model';

export interface CargoItem {
    customerId: number;
    cargoType: string;
    amount: number;
    unit: string;
}

export interface FuelCost {
    location: string;
    amount: number;
}

export interface AdditionalCost {
    amount: number;
    reason: string;
}

export interface ICargo {
    id: number;
    type: string;
    truck: ITruck;
    driver: IEmployee;
    customer: ICustomer;
    cargoItems: CargoItem[];
    initialCost: number; // Chi phí ban đầu
    cargoCost: number; // Chi phí hàng hóa
    loadingCost: number; // Chi phí bốc hàng
    unloadingCost: number; // Chi phí tháo hàng
    transportCost: number; // Chi phí vận chuyển
    employeeCost: number; // Chi phí nhân viên
    fuelCosts: FuelCost[]; // Chi phí xăng dầu
    additionalCosts: AdditionalCost[]; // Chi phí phụ
    paymentDeposit: number; // Tiền cọc
    note: string; // Ghi chú
    createdAt: Date;
    updatedAt: Date;

    /**
     * Thêm một mặt hàng vào danh sách mặt hàng
     * @param cargoItem 
     */
    addCargoItem(cargoItem: CargoItem): Promise<ICargo>;

    /**
     * Thêm một chi phí xăng vào danh sách chi phí xăng
     * @param fuelCost 
     */
    addFuelCost(fuelCost: FuelCost): Promise<ICargo>;

    /**
     * Thêm một chi phí phụ vào danh sách chi phí phụ
     * @param additionalCost 
     */
    addAdditionalCost(additionalCost: AdditionalCost): Promise<ICargo>;

    /**
     * Thêm một khoản tiền cọc vào danh sách khoản tiền cọc
     * 
     * @param paymentDeposit 
     */
    addPaymentDeposit(paymentDeposit: number): Promise<ICargo>;


}
