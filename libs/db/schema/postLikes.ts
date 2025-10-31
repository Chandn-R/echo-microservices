import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.js";


export const postLikes = pgTable("PostLikes", {

    userId: uuid("UserId").notNull().references(() => users.userId, { onDelete: "cascade" }),
    postId: uuid("PostId").notNull().references(() => users.userId, { onDelete: "cascade" }),

}, (table) => [

    primaryKey({ columns: [table.userId, table.postId] }),

]);