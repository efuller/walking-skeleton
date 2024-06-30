import { pgTable, text, timestamp } from "drizzle-orm/pg-core"



export const Journal = pgTable("Journal", {
	id: text("id").primaryKey().notNull(),
	title: text("title").notNull(),
	content: text("content"),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
});

export const DBHealth = pgTable("DBHealth", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
});