import { pgSchema, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
const authSchema = pgSchema("auth");

export const users = authSchema.table("users", {
	id: uuid("id").primaryKey(),
});

export const journal = pgTable("journal", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: varchar("title", { length: 255 }).notNull(),
	content: text("content").default(''),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
});

export const members = pgTable("members", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: uuid("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
	firstName: varchar("first_name", { length: 50 }),
	lastName: varchar("last_name", { length: 50 }),
	email: varchar("email", { length: 255 }).unique().notNull(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
});