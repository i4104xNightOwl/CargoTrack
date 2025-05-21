import { sequelize } from "@src/services/mysql/models";

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

        const usersController = new UsersController(usersService);
        const result = await usersController.get();

        expect(result).toEqual([createdUser]);
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

        const usersController = new UsersController(usersService);
        const result = await usersController.getById(createdUser.id);

        expect(result).toEqual(createdUser);
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

        const usersService = new UsersService();
        const usersController = new UsersController(usersService);
        const result = await usersController.create(users);

        expect(result).toEqual(users);
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

        const updatedUser: IUsers = {
            ...createdUser,
            username: "new username",
            password: "new password",
        };

        const usersController = new UsersController(usersService);
        const result = await usersController.update(updatedUser);

        expect(result).toEqual(updatedUser);
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

        const usersController = new UsersController(usersService);
        const result = await usersController.delete(createdUser.id);

        expect(result).toEqual(createdUser);
    });

    it('Kiểm tra login', async () => {
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

        const usersController = new UsersController(usersService);
        const result = await usersController.login(createdUser.username, createdUser.password);

        expect(result).toEqual(createdUser);
    });
});
