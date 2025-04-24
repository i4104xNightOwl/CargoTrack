import { Sequelize } from 'sequelize'

const config = require('../database.ts')['development']

let sequelize: Sequelize;

if (config.url) {
	sequelize = new Sequelize(config.url, config)
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config)
}

export { Sequelize, sequelize }
