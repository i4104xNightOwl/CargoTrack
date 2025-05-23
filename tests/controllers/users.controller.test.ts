import { IUsers, UserStatus } from "@interfaces/models/users.model";
import UsersController from "@src/controllers/users.controller";
import { UsersBuilder } from "@src/models/users.model";
import { sequelize } from "@src/services/mysql/models";
import { UsersService } from "@src/services/users.service";
import nomalizeDate from "../../utils/dateUtils";

describe('Kiểm tra UsersController', () => {
    beforeAll(async () => {
        await sequelize.authenticate();
    });

    beforeEach(async () => {
        await sequelize.drop();
        await sequelize.sync({ force: true });
    })

    afterAll(async () => {
        await sequelize.close();
    });

    it('Kiểm tra getAll', async () => {
        const users: IUsers = UsersBuilder.new()
            .setUsername("username")
            .setPassword("password")
            .setEmail("email")
            .setPhone("phone")
            .setRole("role")
            .setStatus(UserStatus.ACTIVE)
            .build();

        const usersService = new UsersService();
        const createdUser = await usersService.create(users);

        const usersController = new UsersController();
        const result = await usersController.get();

        expect(nomalizeDate(result)).toEqual(expect.arrayContaining([nomalizeDate(createdUser)]));
    });

    it('Kiểm tra getById', async () => {
        const users: IUsers = UsersBuilder.new()
            .setUsername("username")
            .setPassword("password")
            .setEmail("email")
            .setPhone("phone")
            .setRole("role")
            .setStatus(UserStatus.ACTIVE)
            .build();

        const usersService = new UsersService();
        const createdUser = await usersService.create(users);

        const usersController = new UsersController();
        const result = await usersController.getById(createdUser.id);

        expect(nomalizeDate(result)).toEqual(nomalizeDate(createdUser));
    });

    it('Kiểm tra create', async () => {
        const users: IUsers = UsersBuilder.new()
            .setUsername("username")
            .setPassword("password")
            .setEmail("email")
            .setPhone("phone")
            .setRole("role")
            .setStatus(UserStatus.ACTIVE)
            .build();

        const usersController = new UsersController();
        const result = await usersController.create(users);

        const getAll = await usersController.get();
        expect(nomalizeDate(getAll)).toEqual(expect.arrayContaining([nomalizeDate(result)]));
    });
    
    it('Kiểm tra update', async () => {
        const users: IUsers = UsersBuilder.new()
            .setUsername("username")
            .setPassword("password")
            .setEmail("email")
            .setPhone("phone")
            .setRole("role")
            .setStatus(UserStatus.ACTIVE)
            .build();

        const usersService = new UsersService();
        const createdUser = await usersService.create(users);

        const updatedUser: IUsers = createdUser;
        updatedUser.username = "newUsername";
        updatedUser.password = "newPassword";

        const usersController = new UsersController();
        const result = await usersController.update(updatedUser);

        expect(nomalizeDate(result)).toEqual(nomalizeDate(updatedUser));
    });

    it('Kiểm tra delete', async () => {
        const users: IUsers = UsersBuilder.new()
            .setUsername("username")
            .setPassword("password")
            .setEmail("email")
            .setPhone("phone")
            .setRole("role")
            .setStatus(UserStatus.ACTIVE)
            .build();

        const usersService = new UsersService();
        const createdUser = await usersService.create(users);

        const usersController = new UsersController();
        const result = await usersController.delete(createdUser.id);

        expect(result).toEqual(true);
    });

    // it('Kiểm tra login', async () => {
    //     const users: IUsers = UsersBuilder.new()
    //         .setUsername("username")
    //         .setPassword("password")
    //         .setEmail("email")
    //         .setPhone("phone")
    //         .setRole("role")
    //         .setStatus(UserStatus.ACTIVE)
    //         .build();

    //     const usersService = new UsersService();
    //     const createdUser = await usersService.create(users);

    //     const usersController = new UsersController();
    //     const result = await usersController.login(createdUser.username, createdUser.password);

    //     expect(result).toEqual(createdUser);
    // });
});
