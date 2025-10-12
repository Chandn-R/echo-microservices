import * as dotenv from "dotenv";
import { app } from "./app.js";
import { dbPromise } from "./db/index.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

async function server() {
    const db = await dbPromise;
    console.log("Database is active");

    const server = app.listen(PORT, () => {
        console.log(`Auth Service is running on port ${PORT}`);
    });

    const gracefulShutdown = (signal: string) => {
        console.log(`\nReceived ${signal}. Shutting down gracefully..`);
        server.close(async () => {
            console.log("HTTP server closed.");
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

