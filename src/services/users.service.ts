import { IUsers } from 'interfaces/models/users.model';
import { IUsersService } from '../../interfaces/services/users.service';
import { Users } from '@configs/models/users.model';

export default class UsersService implements IUsersService {
    async get(): Promise<IUsers[]> {
        const users = (await Users.findAll()).map((user: Users) => {
            return user.dataValues
        });
        return users;
    }
    getById(id: number): Promise<IUsers> {
        throw new Error('Method not implemented.');
    }
    async create(item: IUsers): Promise<IUsers> {
        return await Users.create(item);
    }
    update(item: IUsers): Promise<IUsers> {
        throw new Error('Method not implemented.');
    }
    delete(item: IUsers): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}