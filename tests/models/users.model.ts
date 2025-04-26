import { IUsers, UserStatus } from "@interfaces/models/users.model";
import { sequelize } from "@src/services/mysql/models";
import { UsersBuilder } from '@src/models/users.model';
import { UsersService } from "@src/services/users.service";

describe("Kiểm tra UsersModel", () => {
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

    it("Kiểm tra changePassword", async () => {
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

        const user = await usersService.getById(createdUser.id);
        await user.changePassword("new password");

        const getNewUser = await usersService.getById(createdUser.id);

        expect(getNewUser.password).not.toBe(users.password);
    });

    it("Kiểm tra banned", async () => {
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
        await createdUser.banned();

        const getUser = await usersService.getById(createdUser.id);

        expect(getUser.status).toBe(UserStatus.BANNED);
    });

    it("Kiểm tra unban", async () => {
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
        await createdUser.banned();
        await createdUser.unban();

        const getUser = await usersService.getById(createdUser.id);
        expect(getUser.status).toBe(UserStatus.ACTIVE);
    });

})