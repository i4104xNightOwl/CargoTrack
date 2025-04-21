import { IUsers, UserStatus } from "@interface/models/users.model";

export default class Users implements IUsers {
    id: number;
    username: string;
    password: string;
    email: string;
    phone: string;
    role: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;

    changePassword(password: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    banned(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    unban(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

} 