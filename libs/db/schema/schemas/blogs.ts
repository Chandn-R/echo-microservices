import { integer, jsonb, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.js";



export const blogs = pgTable("Blogs", {

    blogId: uuid("BlogId").defaultRandom().primaryKey(),
    userId: uuid("UserId").notNull().references(() => users.userId, { onDelete: "cascade" }),
    content: jsonb("Content").notNull(),
    likes: integer("Likes").default(0),
    comments: integer("Comments").default(0),
    createdAt: timestamp("CreatedAt").defaultNow(),
    updatedAt: timestamp("UpdatedAt").defaultNow(),

});