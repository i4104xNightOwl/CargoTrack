module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'], 
    testMatch: ['**/tests/**/*.ts', '**/?(*.)+(spec|test).ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    moduleNameMapper: {
        "^@src/(.*)$": "<rootDir>/src/$1",
        "^@interface/(.*)$": "<rootDir>/interfaces/$1",
        "^@configs/(.*)$": "<rootDir>/src/configs/$1"
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/__tests__/',
    ]
};
