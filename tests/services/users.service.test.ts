import Database from '../../src/configs/database';
import { IUsers, UserStatus } from '../../interfaces/models/users.model';
import UsersService from '../../src/services/users.service';

describe("Kiểm tra UserService", () => {
    let database: Database;
    // let connection: any;

    beforeEach(() => {
        database = Database.getInstance();
        // connection = database.getConnection();
    })

    afterEach(() => {
        // Xóa bảng dành cho phần test tiếp theo
        database.truncate('users');
        database.disconnect();
    })

    it.only("Kiểm tra get", async () => {
        // Demo users
        const user: IUsers = {
            id: 1,
            username: "username",
            password: "password",
            email: "email",
            phone: "phone",
            role: "role",
            status: UserStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const usersService = new UsersService();
        await usersService.create(user);

        const getUser = await usersService.get();
        
        // TODO: Xóa phần này sau khi viết phần model
        user.status = 1;

        expect(getUser.length).toBeGreaterThan(0);
        expect(user).toEqual(expect.arrayContaining(getUser));
    });

    it("Kiểm tra getById", async () => {
        const user: IUsers = {
            id: 1,
            username: "username",
            password: "password",
            email: "email",
            phone: "phone",
            role: "role",
            status: UserStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const usersService = new UsersService();
        await usersService.create(user);        

        const getUser = await usersService.getById(user.id);
        expect(getUser).toEqual(user);
    });

    it("Kiểm tra create", async () => {
        const user: IUsers = {
            id: 1,
            username: "username",
            password: "password",
            email: "email",
            phone: "phone",
            role: "role",
            status: UserStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const usersService = new UsersService();
        await usersService.create(user);

        const getUser = await usersService.getById(user.id);
        expect(getUser).toEqual(user);
    });

    it("Kiểm tra update", async () => {
        const user: IUsers = {
            id: 1,
            username: "username",
            password: "password",
            email: "email",
            phone: "phone",
            role: "role",
            status: UserStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const usersService = new UsersService();
        await usersService.create(user);

        const getUser = await usersService.getById(user.id);
        getUser.username = "new username";
        await usersService.update(getUser);

        const getUserUpdated = await usersService.getById(user.id);
        expect(getUserUpdated).toEqual(getUser);
    });

    it("Kiểm tra delete", async () => {
        const user: IUsers = {
            id: 1,
            username: "username",
            password: "password",
            email: "email",
            phone: "phone",
            role: "role",
            status: UserStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const usersService = new UsersService();
        await usersService.create(user);
        await usersService.delete(user);

        const getAll = await usersService.get();
        expect(getAll.length).toBe(0);
        expect(user).not.toEqual(expect.arrayContaining(getAll));
    });
})