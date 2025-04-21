import { IUsers, UserStatus } from "../../interfaces/models/users.model";
import { sequelize } from "../../src/configs/models";
import { UsersBuilder } from '../../src/models/users.model';
import UsersService from "../../src/services/users.service";

describe("Kiểm tra UsersModel", () => {
    beforeAll(async () => {
        await sequelize.authenticate();
    });
    
    beforeEach(async () => {
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
        await usersService.create(users);

        const user = await usersService.getById(users.id);
        const isChangePassword = await user.changePassword("new password");

        const getNewUser = await usersService.getById(users.id);

        expect(isChangePassword).toBe(true);
        expect(getNewUser.password).not.toBe(users.password);
    });

    it("Kiểm tra banned", async () => {

    });

    it("Kiểm tra unban", async () => {

    });

})