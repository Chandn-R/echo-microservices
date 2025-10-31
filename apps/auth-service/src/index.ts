import * as dotenv from "dotenv";
dotenv.config();

import { dbPromise } from "../../../libs/db/index.js";
import { app } from "./app.js";


const PORT = process.env.PORT || 5001;

async function server() {
    const { db, pool } = await dbPromise;
    console.log("Database is active");

    app.locals.db = db;

    const server = app.listen(PORT, () => {
        console.log(`Auth Service is running on port ${PORT}`);
    });

    const gracefulShutdown = (signal: string) => {
        console.log(`\nReceived ${signal}. Shutting down gracefully..`);
        server.close(async () => {
            console.log("HTTP server closed.");
            await pool.end();
            console.log("Database pool closed.");
            process.exit(0);
        });
    };

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
}
server().catch(err => {
    console.error("Fatal error during server startup:", err);
    process.exit(1);
});

