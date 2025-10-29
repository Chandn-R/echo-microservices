// src/db/migrate.ts
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from "./index.js";
import * as dotenv from 'dotenv';
dotenv.config();

async function runMigrations() {
    console.log('Running migrations...');
    try {
        await migrate(db, { migrationsFolder: './src/db/migrations' });
        console.log("Migrations completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error running migrations:", error);
        process.exit(1);
    }
}

runMigrations();