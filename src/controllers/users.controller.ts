import { IUsers } from "@interfaces/models/users.model";
import { IUsersService } from "@interfaces/services/users.service";
import { IUsersController } from '../../interfaces/controllers/users.controller';
import { UsersService } from "@src/services/users.service";

export default class UsersController implements IUsersController {
    private usersService: IUsersService;

    constructor() {
        this.usersService = new UsersService();
    }

    async get(): Promise<IUsers[]> {
        return await this.usersService.get();
    }

    async getById(id: number): Promise<IUsers> {
        const user = await this.usersService.getById(id);
        if (!user) throw new Error(`Không tìm thấy người dùng với id ${id}`);
        
        return user;
    }
    async create(user: IUsers): Promise<IUsers> {
        return await this.usersService.create(user);
    }

    async update(user: IUsers): Promise<IUsers> {
        const existingUser = await this.usersService.getById(user.id);
        if (!existingUser) throw new Error(`Không tìm thấy người dùng với id ${user.id}`);
        
        return await this.usersService.update(user);
    }

    async delete(id: number): Promise<boolean> {
        const existingUser = await this.usersService.getById(id);
        if (!existingUser) throw new Error(`Không tìm thấy người dùng với id ${id}`);
        
        return await this.usersService.delete(existingUser);
    }

    async login(username: string, password: string): Promise<IUsers> {  
        throw new Error(`Chức năng đăng nhập chưa được triển khai`);
        // const user = await this.usersService.getByUsername(username);
        // if (!user) {
        //     throw new Error(`Người dùng không tồn tại`);
        // }
        // if (user.password !== password) {
        //     throw new Error(`Sai mật khẩu`);
        // }
        // return user;
    }
}