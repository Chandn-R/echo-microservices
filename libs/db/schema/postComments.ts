import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { posts } from "./posts.js";


export const postComments = pgTable("PostComments", {

    commentId: uuid("CommentId").defaultRandom().primaryKey(),
    postId: uuid("PostId").notNull().references(() => posts.postId, { onDelete: "cascade" }),
    userId: uuid("UserId").notNull().references(() => users.userId, { onDelete: "cascade" }),
    comment: text("Comment").notNull(),
    createdAt: timestamp("CreatedAt").defaultNow(),
    updatedAt: timestamp("UpdatedAt").defaultNow(),

});