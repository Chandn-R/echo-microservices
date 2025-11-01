import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function runMigrations() {
    console.log('Running migrations...');

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error("DATABASE_URL is not set.");
    }

    const client = new Client({
        connectionString: databaseUrl,
    });

    try {
        await client.connect();

        const db = drizzle(client);

        await migrate(db, { migrationsFolder: './migrations' });

        console.log("Migrations completed successfully!");
    } catch (error) {
        console.error("Error running migrations:", error);
        process.exit(1);
    } finally {
        await client.end();
        console.log("Migration client disconnected.");
        process.exit(0);
    }
}

runMigrations();