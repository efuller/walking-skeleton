import { Member, members } from '@efuller/api/src/shared/persistence/drizzle/schema';

export type CreateMemberCommand = typeof members.$inferInsert;

export type CreatedMemberResult = Omit<Member, 'password'>;