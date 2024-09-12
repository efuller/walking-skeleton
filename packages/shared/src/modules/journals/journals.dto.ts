import { journal } from '@efuller/api/src/shared/persistence/drizzle/schema';
import { createInsertSchema } from 'drizzle-zod';

export type CreateJournalDto = typeof journal.$inferInsert;
export type Journal = typeof journal.$inferSelect
export type JournalDto = typeof journal.$inferSelect

export const CreateJournalSchema = createInsertSchema(journal);
