import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { schema } from './schema/index.js';

async function initializeDatabase(): Promise<{ db: NodePgDatabase<typeof schema>; pool: Pool }> {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error("DATABASE_URL is not set in environment variables. Application cannot start.");
    }

    const pool = new Pool({
        connectionString: databaseUrl,
    });

    try {
        await pool.query('SELECT 1');
        console.log('Database connection initialized.');

        const dbInstance = drizzle(pool, { schema });

        return { db: dbInstance, pool };

    } catch (error) {
        console.error(" Failed to initialize database connection", error);
        throw new Error(" Database initialization failed ");
    }
}

export const dbPromise = initializeDatabase();