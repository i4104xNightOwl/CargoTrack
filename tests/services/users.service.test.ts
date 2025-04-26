import { sequelize } from '@src/services/mysql/models';
import { IUsers, UserStatus } from '@interfaces/models/users.model';
import { UsersService } from '@src/services/users.service';
import { UsersBuilder } from '@src/models/users.model';
import nomalizeDate from '../../utils/dateUtils';

describe("Kiểm tra UserService", () => {
    beforeAll(async () => {
        await sequelize.authenticate();
    });

    beforeEach(async () => {
        await sequelize.drop();
        await sequelize.sync({ force: true });
    })
    
    afterAll(async () => {
        await sequelize.close();
    })

    it("Kiểm tra get", async () => {
        const user: IUsers = UsersBuilder.new()
            .setUsername("username")
            .setPassword("password")
            .setEmail("email")
            .setPhone("phone")
            .setRole("role")
            .setStatus(UserStatus.ACTIVE)
            .build();

        const usersService = new UsersService();
        const createdUser = await usersService.create(user);

        const getUser = await usersService.get();

        expect(getUser.length).toBeGreaterThan(0);
        expect(nomalizeDate(getUser)).toEqual(
            expect.arrayContaining([nomalizeDate(createdUser)])
        );
    });

    it("Kiểm tra getById", async () => {
        const user: IUsers = UsersBuilder.new()
            .setUsername("username")
            .setPassword("password")
            .setEmail("email")
            .setPhone("phone")
            .setRole("role")
            .setStatus(UserStatus.ACTIVE)
            .build();

        const usersService = new UsersService();
        const createdUser = await usersService.create(user);        

        const getUser = await usersService.getById(createdUser.id);
        
        expect(getUser.username).toEqual(user.username);
        expect(getUser.email).toEqual(user.email);
        expect(getUser.phone).toEqual(user.phone);
        expect(getUser.password).toEqual(user.password);
        expect(getUser.role).toEqual(user.role);
        expect(getUser.status).toEqual(user.status);
    });

    it("Kiểm tra create", async () => {
        const user: IUsers = UsersBuilder.new()
            .setUsername("username")
            .setPassword("password")
            .setEmail("email")
            .setPhone("phone")
            .setRole("role")
            .setStatus(UserStatus.ACTIVE)
            .build();

        const usersService = new UsersService();
        const createdUser = await usersService.create(user);

        const getUser = await usersService.getById(createdUser.id);

        expect(getUser.username).toEqual(user.username);
        expect(getUser.email).toEqual(user.email);
        expect(getUser.phone).toEqual(user.phone);
        expect(getUser.password).toEqual(user.password);
        expect(getUser.role).toEqual(user.role);
        expect(getUser.status).toEqual(user.status);
    });

    it("Kiểm tra update", async () => {
        const user: IUsers = UsersBuilder.new()
            .setUsername("username")
            .setPassword("password")
            .setEmail("email")
            .setPhone("phone")
            .setRole("role")
            .setStatus(UserStatus.ACTIVE)
            .build();

        const usersService = new UsersService();
        await usersService.create(user);

        const createdUser = await usersService.create(user);
        const getUser = await usersService.getById(createdUser.id);

        getUser.username = "new username";
        await usersService.update(getUser);

        const getUserUpdated = await usersService.getById(createdUser.id);
        expect(getUserUpdated).toEqual(getUser);
    });

    it("Kiểm tra delete", async () => {
        const user: IUsers = UsersBuilder.new()
            .setUsername("username")
            .setPassword("password")
            .setEmail("email")
            .setPhone("phone")
            .setRole("role")
            .setStatus(UserStatus.ACTIVE)
            .build();

        const usersService = new UsersService();
        const createdUser = await usersService.create(user);
        await usersService.delete(createdUser);

        const getAll = await usersService.get();
        expect(getAll.length).toBe(0);
    });
})