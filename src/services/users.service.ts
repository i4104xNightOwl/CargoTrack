import { IUsers } from 'interfaces/models/users.model';
import { IUsersService } from '../../interfaces/services/users.service';
import { UsersDB } from '@configs/models/users.model';

export default class UsersService implements IUsersService {
    async get(): Promise<IUsers[]> {
        const users = (await UsersDB.findAll()).map((user: UsersDB) => {
            return user.dataValues
        });
        return users;
    }
    async getById(id: number): Promise<IUsers> {
        const users = await UsersDB.findByPk(id);
        if (!users) throw new Error('User not found');
        return users.dataValues;
    }

    async create(item: IUsers): Promise<IUsers> {
        return await UsersDB.create(item);
    }

    async update(item: IUsers): Promise<IUsers> {
        const users = await UsersDB.findByPk(item.id);
        if (!users) throw new Error("User not found");
        await users.update(item)
        return this.getById(item.id);
    }

    async delete(item: IUsers): Promise<boolean> {
        const users = await UsersDB.findByPk(item.id);
        if (!users) throw new Error("User not found");
        await users.destroy();
        return true;
    }

}