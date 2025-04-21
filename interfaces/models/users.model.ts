export enum UserStatus {
    ACTIVE = 1,
    INACTIVE = 0,
    BANNED = 2
}

export interface IUsers {
    id: number;
    username: string;
    password: string;
    email: string;
    phone: string;
    role: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;

    /**
     * Đổi mật khảu
     * 
     * @param password mật khẩu mới
     * @returns Promise<boolean>
     */
    changePassword(password: string): Promise<IUsers>;

    /**
     * Khóa tài khoản
     * 
     * @returns Promise<boolean>
     */
    banned(): Promise<IUsers>;

    /**
     * Mở khóa tài khoản
     * 
     * @returns Promise<boolean>
     */
    unban(): Promise<IUsers>;

}