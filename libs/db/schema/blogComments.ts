import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { blogs } from "./blogs.js";
import { users } from "./users.js";


export const blogComments = pgTable("BlogComments", {

    commentId: uuid("CommentId").defaultRandom().primaryKey(),
    blogId: uuid("BlogId").notNull().references(() => blogs.blogId, { onDelete: "cascade" }),
    userId: uuid("UserId").notNull().references(() => users.userId, { onDelete: "cascade" }),
    comment: text("Comment").notNull(),
    createdAt: timestamp("CreatedAt").defaultNow(),
    updatedAt: timestamp("UpdatedAt").defaultNow(),

});