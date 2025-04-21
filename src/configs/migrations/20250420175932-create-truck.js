'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return await queryInterface.createTable('truck', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			licensePlate: Sequelize.STRING,
			status: Sequelize.INTEGER
		}, {
			timestamps: true
		});
	},

	async down(queryInterface, Sequelize) {
		return await queryInterface.dropTable('truck');
	}
};
