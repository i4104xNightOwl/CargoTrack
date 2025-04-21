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


export class UsersBuilder {
    item: Users;

    private constructor() {
        this.item = new Users();
    }

    public setUsername(username: string) {
        this.item.username = username;
        return this;
    }

    public setPassword(password: string) {
        this.item.password = password;
        return this;
    }

    public setEmail(email: string) {
        this.item.email = email;
        return this;
    }

    public setPhone(phone: string) {
        this.item.phone = phone;
        return this;
    }

    public setRole(role: string) {
        this.item.role = role;
        return this;
    }

    public setStatus(status: UserStatus) {
        this.item.status = status;
        return this;
    }

    public static new() { return new UsersBuilder(); }
    public build() { return this.item }

}