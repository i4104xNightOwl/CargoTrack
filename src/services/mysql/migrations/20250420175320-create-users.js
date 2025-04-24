module.exports = {
	up: async (queryInterface, Sequelize) => {
		return await queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			username: Sequelize.STRING,
			password: Sequelize.STRING,
			email: Sequelize.STRING,
			phone: Sequelize.STRING,
			role: Sequelize.STRING,
			status: Sequelize.INTEGER
		}, {
			timestamps: true
		});
	},
	down: async (queryInterface, Sequelize) => {
		return await queryInterface.dropTable('users');
	}
};
