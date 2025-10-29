import { users } from "../../db/schema.ts";

declare global {
    namespace Express {
        interface Request {
            user?: users;
        }
    }
}