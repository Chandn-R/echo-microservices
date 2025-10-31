import { users } from "../../../../../libs/db/schema.ts";

declare global {
    namespace Express {
        interface Request {
            user?: users;
        }
    }
}