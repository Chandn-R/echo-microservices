import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool, type PoolClient } from '../../node_modules/@types/pg/index.js';
import * as dotenv from 'dotenv';
import * as schema from './schema.js';

dotenv.config();

async function initializeDatabase(): Promise<NodePgDatabase<typeof schema>> {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error("DATABASE_URL is not set in environment variables. Application cannot start.");
    }

    const pool = new Pool({
        connectionString: databaseUrl,
    });

    let client: PoolClient | undefined;
    try {
        client = await pool.connect();
        console.log('Database connection initialized.');

        const dbInstance = drizzle(pool, { schema });

        return dbInstance;

    } catch (error) {
        console.error('Failed to initialize database connection.');
        console.error(error);
        process.exit(1);
    } finally {
        if (client) {
            client.release();
        }
    }
    throw new Error("Failed to initialize database connection and did not exit process.");
}

export const dbPromise = initializeDatabase();