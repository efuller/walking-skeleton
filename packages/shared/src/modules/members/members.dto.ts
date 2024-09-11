import { members } from '@efuller/api/src/shared/persistence/drizzle/schema';
import { createInsertSchema } from 'drizzle-zod';

export type CreateMemberDto = typeof members.$inferInsert;
export type Member = typeof members.$inferSelect;
export const CreateUserSchema = createInsertSchema(members);

export type CreatedMemberResult = Omit<Member, 'password'>;
export type MemberDto = Omit<Member, 'password'>;
