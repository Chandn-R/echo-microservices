import { index, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.js";


export const follows = pgTable("Follows", {

    followerId: uuid("FollowerId").notNull().references(() => users.userId, { onDelete: 'cascade' }),
    followingId: uuid("FollowingId").notNull().references(() => users.userId, { onDelete: 'cascade' }),

}, (table) => [

    primaryKey({ columns: [table.followerId, table.followingId] }),
    index("follower_idx").on(table.followerId),
    index("following_idx").on(table.followingId),

]);