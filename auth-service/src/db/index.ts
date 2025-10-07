import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as schema from './schema.js';

dotenv.config();

function initializeDatabase() {
    try {
        const databaseUrl = process.env.DATABASE_URL;

        if (!databaseUrl) {
            throw new Error("DATABASE_URL is not set in environment variables. Application cannot start.");
        }

        const pool = new Pool({
            connectionString: databaseUrl,
        });

        const dbInstance = drizzle(pool, { schema });
        console.log('Database connection pool initialized.');

        return dbInstance;

    } catch (error) {
        console.error('Failed to initialize database connection.');
        console.error(error);
        process.exit(1);
    }
}

export const db: NodePgDatabase<typeof schema> = initializeDatabase();