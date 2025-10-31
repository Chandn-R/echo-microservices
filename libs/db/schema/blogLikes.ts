import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.js";

export const blogLikes = pgTable("BlogLikes", {

    userId: uuid("UserId").notNull().references(() => users.userId, { onDelete: "cascade" }),
    blogId: uuid("BlogId").notNull().references(() => users.userId, { onDelete: "cascade" }),

}, (table) => [

    primaryKey({ columns: [table.userId, table.blogId] })

]);
