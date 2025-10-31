import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.js";



export const posts = pgTable("Posts", {

    postId: uuid("PostId").defaultRandom().primaryKey(),
    userId: uuid("UserId").notNull().references(() => users.userId, { onDelete: "cascade" }),
    content: text("Content").notNull(),
    description: text("Description").default(""),
    likes: integer("Likes").default(0),
    comments: integer("Comments").default(0),
    createdAt: timestamp("CreatedAt").defaultNow(),
    updatedAt: timestamp("UpdatedAt").defaultNow()

})