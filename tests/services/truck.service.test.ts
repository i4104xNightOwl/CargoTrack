
describe("Kiểm tra TruckService", () => {
    beforeAll(async () => {
        await sequelize.authenticate();
    })

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    })
    
    afterAll(async () => {
        await sequelize.close();
    })
    
    it("Kiểm tra get", () => {
        
    });

    it("Kiểm tra getById", () => {

    });

    it("Kiểm tra create", () => {

    });

    it("Kiểm tra update", () => {

    });

    it("Kiểm tra delete", () => {

    });
})