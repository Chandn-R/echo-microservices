import { pgTable, uuid, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    followers: jsonb("followers").default([]),
    following: jsonb("following").default([]),
    profilePicture: jsonb("profilePicture").default({ secure_url: "", public_id: "" }),
    bio: text("bio").default(""),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});
