import * as dotenv from "dotenv";
import { app } from "./app.js";
// import { db } from "./db/index.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Auth Service is running on port ${PORT}`);
});
