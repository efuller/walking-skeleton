import { members } from '@efuller/api/src/shared/persistence/drizzle/schema';

export type CreateMemberCommand = typeof members.$inferInsert;
export type Member = typeof members.$inferSelect;

export type CreatedMemberResult = Omit<Member, 'password'>;
export type MemberDto = Omit<Member, 'password'>;
