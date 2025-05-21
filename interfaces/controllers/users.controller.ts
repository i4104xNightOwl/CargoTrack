import { IUsers } from '../models/users.model';

export interface IUsersController {
    /**
     * Lấy danh sách người dùng
     * @returns Danh sách người dùng
     */
    get(): Promise<IUsers[]>;

    /**
     * Lấy thông tin người dùng theo id
     * @param id 
     * @returns Thông tin người dùng
     */
    getById(id: number): Promise<IUsers | null>;
    
    /**
     * Tìm kiếm người dùng theo tên
     * @param name
     * @returns Danh sách người dùng
     */
    create(user: IUsers): Promise<IUsers>;
    
    /**
     * Cập nhật thông tin người dùng
     * @param user 
     * @returns Thông tin người dùng
     */
    update(user: IUsers): Promise<IUsers | null>;

    /**
     * Xóa người dùng theo id
     * @param id 
     * @returns Thông tin người dùng
     */
    delete(id: number): Promise<IUsers | null>;

    /**
     * Đăng nhập
     * @param username 
     * @param password 
     * @returns Thông tin người dùng
     */
    login(username: string, password: string): Promise<IUsers | null>;
}