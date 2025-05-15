import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../schema';
import '../schema/relations';
import * as dotenv from 'dotenv';
dotenv.config();

// Define the database configuration type
interface DatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    ssl: boolean;
}

// Helper function to validate required environment variables
function getRequiredEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

// Create the database configuration with validation
export const dbConfig: DatabaseConfig = {
    host: getRequiredEnvVar('DB_HOST'),
    port: Number(getRequiredEnvVar('DB_PORT')),
    user: getRequiredEnvVar('POSTGRES_USER'),
    password: getRequiredEnvVar('POSTGRES_PASSWORD'),
    database: getRequiredEnvVar('POSTGRES_DB'),
    ssl: true,
};

// Optional: Add runtime validation
if (Number.isNaN(dbConfig.port)) {
    throw new Error('DB_PORT must be a valid number');
}

const pool = new Pool(dbConfig);

export const db = drizzle(pool, {
    schema,
});
