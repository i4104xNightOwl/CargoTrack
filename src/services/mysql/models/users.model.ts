import { DataTypes, Model, ModelScopeOptions, ModelValidateOptions, Optional } from 'sequelize'
import { sequelize } from '.'

// Định nghĩa các attributes cho model
export interface UsersDBAttributes {
    id: number
    username: string
    password: string
    email: string
    phone: string
    role: string
    status: number
    createdAt: Date
    updatedAt: Date
}

// Loại bỏ ID khi thêm dữ liệu
export interface UsersDBCreationAttributes extends Optional<UsersDBAttributes, 'id'> { }

export class UsersDB extends Model<UsersDBAttributes, UsersDBCreationAttributes> implements UsersDBAttributes {
    id: number
    username: string
    password: string
    email: string
    phone: string
    role: string
    status: number
    createdAt: Date
    updatedAt: Date
    
    static readonly scopes: ModelScopeOptions = {
        /*
          nơi khai báo scope
        */
    }

    static readonly validations: ModelValidateOptions = {
        /*
          nơi khai báo validation
        */
    }
}

UsersDB.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    username: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    status: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'users',
    underscored: true,
    updatedAt: true,
    createdAt: true,
    scopes: UsersDB.scopes,
    validate: UsersDB.validations,
})

