import { pgTable, text, uuid, jsonb, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("Users", {

    userId: uuid("UserId").defaultRandom().primaryKey(),
    name: text("Name").notNull(),
    userName: text("UserName").notNull().unique(),
    email: text("Email").notNull().unique(),
    password: text("Password").notNull(),
    profilePicture: jsonb("ProfilePicture").default({ secure_url: "", public_id: "" }),
    createdAt: timestamp("CreatedAt").defaultNow(),
    updatedAt: timestamp("UpdatedAt").defaultNow()

});