import { DataTypes, Model, ModelScopeOptions, ModelValidateOptions, Optional } from 'sequelize'
import { sequelize } from '.'
import { CargoDB } from './cargo.model'

export interface CustomerDBAttributes {
    id: number
    name: string
    email: string
    phone: string
    address: string
    status: number
    createdAt: Date
    updatedAt: Date
}

export interface CustomerDBCreationAttributes extends Optional<CustomerDBAttributes, 'id'> { }

export class CustomerDB extends Model<CustomerDBAttributes, CustomerDBCreationAttributes> implements CustomerDBAttributes {
    id: number
    name: string
    email: string
    phone: string
    address: string
    status: number
    createdAt: Date
    updatedAt: Date

    static readonly scopes: ModelScopeOptions = {
        active: {
            where: {
                status: 1
            }
        }
    }

    static readonly validations: ModelValidateOptions = {
        validateEmail(this: CustomerDB) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
                throw new Error('Email không hợp lệ')
            }
        },
        validatePhone(this: CustomerDB) {
            if (!/^[0-9]{10,11}$/.test(this.phone)) {
                throw new Error('Số điện thoại không hợp lệ')
            }
        }
    }
}

CustomerDB.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    address: {
        allowNull: false,
        type: DataTypes.STRING
    },
    status: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
            isIn: [[0, 1]] // 0: Inactive, 1: Active
        }
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
    tableName: 'customer',
    underscored: true,
    updatedAt: true,
    createdAt: true,
    scopes: CustomerDB.scopes,
    validate: CustomerDB.validations,
})

CustomerDB.hasMany(CargoDB, {
    foreignKey: 'customerId',
    onDelete: 'CASCADE'
})
