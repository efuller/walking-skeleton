import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const journal = pgTable("journal", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	content: text("content").default(''),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
});

export const members = pgTable("members", {
	id: serial("id").primaryKey(),
	firstName: varchar("first_name", { length: 50 }),
	lastName: varchar("last_name", { length: 50 }),
	email: varchar("email", { length: 255 }).notNull(),
	password: text("password").notNull(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
});

export type CreateMemberDto = typeof members.$inferInsert;
export type Member = typeof members.$inferSelect;

export const dbhealth = pgTable("dbhealth", {
	id: serial("id").primaryKey(),
	name: text("name"),
});

export type JournalDto = typeof journal.$inferSelect;