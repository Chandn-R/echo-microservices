import { boolean, date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.js";



export const profileSettings = pgTable("ProfileSettings", {

    profileId: uuid("ProfileId").defaultRandom().primaryKey(),
    userId: uuid("UserId").notNull().references(() => users.userId, { onDelete: "cascade" }),
    bio: text("Bio").default(""),
    birthDate: date("BirthDate"),
    private: boolean("Private").default(true),
    country: text("Country").default("India"),
    language: text("Language").default("english"),

});