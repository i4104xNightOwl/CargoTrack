import { IUsers } from 'interfaces/models/users.model';
import { IUsersService } from '../../interfaces/services/users.service';

export default class UsersService implements IUsersService {
    get(): Promise<IUsers[]> {
        throw new Error('Method not implemented.');
    }
    getById(id: number): Promise<IUsers> {
        throw new Error('Method not implemented.');
    }
    create(item: IUsers): Promise<IUsers> {
        throw new Error('Method not implemented.');
    }
    update(item: IUsers): Promise<IUsers> {
        throw new Error('Method not implemented.');
    }
    delete(id: number): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}