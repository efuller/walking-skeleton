import { journal } from '@efuller/api/src/shared/persistence/drizzle/schema';

export type CreateJournalCommand = typeof journal.$inferInsert;
export type Journal = typeof journal.$inferSelect