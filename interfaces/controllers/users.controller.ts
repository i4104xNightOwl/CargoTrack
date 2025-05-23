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
     * @throws Error nếu không tìm thấy người dùng
     */
    getById(id: number): Promise<IUsers>;
    
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
     * @throws Error nếu không tìm thấy người dùng
     */
    update(user: IUsers): Promise<IUsers>;

    /**
     * Xóa người dùng theo id
     * @param id 
     * @returns Thông tin người dùng
     * @throws Error nếu không tìm thấy người dùng
     */
    delete(id: number): Promise<boolean>;

    /**
     * Đăng nhập
     * @param username 
     * @param password 
     * @returns Thông tin người dùng
     * @throws Error lỗi đăng nhập
    */

    login(username: string, password: string): Promise<IUsers>;
}