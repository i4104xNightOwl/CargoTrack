import { DataTypes, Model, ModelScopeOptions, ModelValidateOptions, Optional } from 'sequelize'
import { sequelize } from '.'
import { CargoDB } from './cargo.model'

export interface EmployeeDBAttributes {
    id: number
    name: string
    email: string
    phone: string
    role: string
    status: number
    createdAt: Date
    updatedAt: Date
}

export interface EmployeeDBCreationAttributes extends Optional<EmployeeDBAttributes, 'id'> { }

export class EmployeeDB extends Model<EmployeeDBAttributes, EmployeeDBCreationAttributes> implements EmployeeDBAttributes {
    id: number
    name: string
    email: string
    phone: string
    role: string
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
        validateEmail(this: EmployeeDB) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
                throw new Error('Email không hợp lệ')
            }
        },
        validatePhone(this: EmployeeDB) {
            if (!/^[0-9]{10,11}$/.test(this.phone)) {
                throw new Error('Số điện thoại không hợp lệ')
            }
        }
    }
}

EmployeeDB.init({
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
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            isIn: [['driver', 'manager', 'admin']]
        }
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
    tableName: 'employee',
    underscored: true,
    updatedAt: true,
    createdAt: true,
    scopes: EmployeeDB.scopes,
    validate: EmployeeDB.validations,
})

EmployeeDB.hasMany(CargoDB, {
    foreignKey: 'driverId',
    onDelete: 'CASCADE'
})
