import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default defineConfig({
    schema: 'dist/libs/db/schema/schemas/*.ts',
    out: "libs/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    breakpoints: true,
    verbose: true,
    strict: true,
});
