import mysql, { Connection } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export default class Database {
    private static instance: Database;
    private connection: Connection;

    private constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        this.connection.connect((err) => {
            if (err) {
                console.error('❌ Error connecting to MySQL:', err.message);
                return;
            }
            console.log('✅ Connected to MySQL database');
        });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public getConnection(): Connection {
        return this.connection;
    }

    public disconnect(): void {
        this.connection.end((err) => {
            if (err) {
                console.error('❌ Error disconnecting MySQL:', err.message);
                return;
            }
            console.log('🔌 Disconnected from MySQL');
        });
    }
}
