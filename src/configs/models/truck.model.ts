import { DataTypes, Model, ModelScopeOptions, ModelValidateOptions, Optional } from 'sequelize'
import { sequelize } from '.'
import { TruckStatus } from '../../../interfaces/models/truck.model';
import { CargoDB } from './cargo.model'

// Định nghĩa các attributes cho model
export interface TruckDBAttributes {
    id: number
    licensePlate: string
    status: TruckStatus
    createdAt: Date
    updatedAt: Date
}

// Loại bỏ ID khi thêm dữ liệu
export interface TruckDBCreationAttributes extends Optional<TruckDBAttributes, 'id'> { }

export class TruckDB extends Model<TruckDBAttributes, TruckDBCreationAttributes> implements TruckDBAttributes {
    id: number
    licensePlate: string
    status: TruckStatus;
    createdAt: Date
    updatedAt: Date
    
    static readonly scopes: ModelScopeOptions = {
        active: {
            where: {
                isActive: true
            }
        }
    }

    static readonly validations: ModelValidateOptions = {
        
    }
}

TruckDB.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    licensePlate: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    status: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
            isIn: [[0, 1]] // 0: Đang chờ, 1: Đang chuyển hàng
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
    tableName: 'truck',
    underscored: true,
    updatedAt: true,
    createdAt: true,
    scopes: TruckDB.scopes,
    validate: TruckDB.validations,
})

TruckDB.hasMany(CargoDB, {
    foreignKey: 'truckId',
    onDelete: 'CASCADE'
})


