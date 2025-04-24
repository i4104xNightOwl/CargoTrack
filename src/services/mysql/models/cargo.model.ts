import { DataTypes, Model, ModelScopeOptions, ModelValidateOptions, Optional } from 'sequelize'
import { sequelize } from '.'
import { TruckDB } from './truck.model'
import { EmployeeDB } from './employee.model'
import { CustomerDB } from './customer.model'

interface FuelCost {
    location: string;
    amount: number;
}

interface AdditionalCost {
    amount: number;
    reason: string;
}

interface CargoItem {
    customerId: number;
    cargoType: string;
    amount: number;
    unit: string;
}

export interface CargoDBAttributes {
    id: number
    type: string // 'up' hoặc 'down'
    truckId: number
    driverId: number
    customerId: number
    cargoItems: CargoItem[]
    initialCost: number
    cargoCost: number
    loadingCost: number
    unloadingCost: number
    transportCost: number
    fuelCosts: FuelCost[]
    additionalCosts: AdditionalCost[]
    specialInstructions: string
    createdAt: Date
    updatedAt: Date
}

export interface CargoDBCreationAttributes extends Optional<CargoDBAttributes, 'id'> { }

export class CargoDB extends Model<CargoDBAttributes, CargoDBCreationAttributes> implements CargoDBAttributes {
    id: number
    type: string
    truckId: number
    driverId: number
    customerId: number
    cargoItems: CargoItem[]
    initialCost: number
    cargoCost: number
    loadingCost: number
    unloadingCost: number
    transportCost: number
    fuelCosts: FuelCost[]
    additionalCosts: AdditionalCost[]
    specialInstructions: string
    createdAt: Date
    updatedAt: Date

    static readonly scopes: ModelScopeOptions = {
        
    }

    static readonly validations: ModelValidateOptions = {
        
    }
}

CargoDB.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    type: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            isIn: [['up', 'down']]
        }
    },
    truckId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'truck',
            key: 'id'
        }
    },
    driverId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'employee',
            key: 'id'
        }
    },
    customerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'customer',
            key: 'id'
        }
    },
    cargoItems: {
        allowNull: false,
        type: DataTypes.JSON,
        defaultValue: []
    },
    initialCost: {
        allowNull: false,
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    cargoCost: {
        allowNull: false,
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    loadingCost: {
        allowNull: false,
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    unloadingCost: {
        allowNull: false,
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    transportCost: {
        allowNull: false,
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    fuelCosts: {
        allowNull: false,
        type: DataTypes.JSON,
        defaultValue: []
    },
    additionalCosts: {
        allowNull: false,
        type: DataTypes.JSON,
        defaultValue: []
    },
    specialInstructions: {
        allowNull: true,
        type: DataTypes.TEXT
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
    tableName: 'cargo',
    underscored: true,
    updatedAt: true,
    createdAt: true,
    scopes: CargoDB.scopes,
    validate: CargoDB.validations,
})

CargoDB.belongsTo(TruckDB, {
    foreignKey: 'truckId',
    onDelete: 'CASCADE'
})

CargoDB.belongsTo(EmployeeDB, {
    foreignKey: 'driverId',
    onDelete: 'CASCADE'
})

CargoDB.belongsTo(CustomerDB, {
    foreignKey: 'customerId',
    onDelete: 'CASCADE'
})


EmployeeDB.hasMany(CargoDB, {
    foreignKey: 'driverId',
    onDelete: 'CASCADE'
})


TruckDB.hasMany(CargoDB, {
    foreignKey: 'truckId',
    onDelete: 'CASCADE'
})

CustomerDB.hasMany(CargoDB, {
    foreignKey: 'customerId',
    onDelete: 'CASCADE'
})
