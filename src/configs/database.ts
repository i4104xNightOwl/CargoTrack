require('dotenv').config()

const host = process.env.DB_HOST
const username = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME
const logging = (process.env.SEQUELIZE_LOG === 'true') ? true : false

module.exports = {
	development: {
		username,
		password,
		database,
		host,
		logging,
		port: 3306,
		dialect: 'mysql',
	},
}

