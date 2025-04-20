
export interface ServiceBase<T> {
    /**
     * Lấy toàn bộ dữ liệu
     * 
     * @returns Promise<T[]>
     */
    get(): Promise<T[]>;

    /**
     * Lấy dữ liệu dựa trên ID 
     * @param id 
     * 
     * @returns Promise<T>: Dữ liệu tương ứng với ID
     * @throws Error: Không tìm thấy dữ liệu 
     */
    getById(id: number): Promise<T>;
    
    /**
     * Thêm dữ liệu mới
     * @param item 
     * 
     * @returns Promise<T>: Dữ liệu sau khi được thêm vào 
     */
    create(item: T): Promise<T>;
    
    /**
     * Cập nhật dữ liệu dựa trên ID
     * @param item 
     * 
     * @returns Promise<T>: Dữ liệu mới sau khi được update
     * @throws Error: Không tìm thấy dữ liệu 
     */
    update(item: T): Promise<T>;
    
    /**
     * Xoa dữ liệu dựa trên ID
     * @param item
     * 
     * @returns Promise<boolean>
     * @throws Error: Không tìm thấy dữ liệu
     */
    delete(item: T): Promise<boolean>;
}