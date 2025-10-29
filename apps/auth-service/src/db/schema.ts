import { relations } from "drizzle-orm";
import { pgTable, uuid, text, jsonb, timestamp, primaryKey, index } from "drizzle-orm/pg-core";

export const users = pgTable("users", {

    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    profilePicture: jsonb("profilePicture").default({ secure_url: "", public_id: "" }),
    bio: text("bio").default(""),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()

});

export const follows = pgTable("follows", {

    followerId: uuid("follower_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
    followingId: uuid("following_id").notNull().references(() => users.id, { onDelete: 'cascade' }),

}, (table) => [

    primaryKey({ columns: [table.followerId, table.followingId] }),
    index("follower_idx").on(table.followerId),
    index("following_idx").on(table.followingId),

]);

export const usersRelations = relations(users, ({ many }) => ({

    following: many(follows, {
        relationName: 'is_following',
    }),

    followers: many(follows, {
        relationName: 'has_followers',
    }),

}));

export const followsRelations = relations(follows, ({ one }) => ({

    follower: one(users, {
        fields: [follows.followerId],
        references: [users.id],
        relationName: 'is_following',
    }),

    following: one(users, {
        fields: [follows.followingId],
        references: [users.id],
        relationName: 'has_followers',
    }),

}));