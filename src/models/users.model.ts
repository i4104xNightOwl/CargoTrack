import { IUsers, UserStatus } from "@interfaces/models/users.model";
import { UsersService } from "@src/services/users.service";

export class Users implements IUsers {
    id: number;
    username: string;
    password: string;
    email: string;
    phone: string;
    role: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;

    async changePassword(password: string): Promise<IUsers> {
        const usersService: UsersService = new UsersService();
        this.password = password;
        await usersService.update(this);
        return this;
    }
    
    async banned(): Promise<IUsers> {
        const usersService: UsersService = new UsersService();
        this.status = UserStatus.BANNED;
        await usersService.update(this);
        return this;
    }
    
    async unban(): Promise<IUsers> {
        const usersService: UsersService = new UsersService();
        this.status = UserStatus.ACTIVE;
        await usersService.update(this);
        return this;
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