import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const journal = pgTable("journal", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	content: text("content").default(''),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
});

export const dbhealth = pgTable("dbhealth", {
	id: serial("id").primaryKey(),
	name: text("name"),
});

export type CreateJournalDto = typeof journal.$inferInsert;
export type JournalDto = typeof journal.$inferSelect;