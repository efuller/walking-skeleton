import { JournalRepo } from '@efuller/api/src/modules/journals/journal.repo';
import { ApiResponse } from '@efuller/shared/src/api';
import { DbClient } from '@efuller/api/src/shared/persistence/dbConnection/adapters/drizzleClient';
import { journal, JournalDto } from '@efuller/api/src/shared/persistence/drizzle/schema';
import { eq } from 'drizzle-orm';
import { CreateJournalCommand } from '@efuller/shared/src/modules/journals/commands';

export class DrizzleJournalRepo implements JournalRepo {
  constructor(private readonly db: DbClient) {}

  async createJournal(journalDto: CreateJournalCommand): Promise<ApiResponse<JournalDto | null>> {

    const result = await this.db.insert(journal).values({
      ...journalDto,
    }).returning();

    if (result.length > 0 ) {
      return {
        success: true,
        data: { ...result[0] },
      }
    }

    return {
      success: true,
      data: null,
    }
  }

  async getJournals(): Promise<ApiResponse<JournalDto[]>> {
    const result = await this.db.select().from(journal);

    if (result.length > 0 ) {
      return {
        success: true,
        data: result,
      }
    }

    return {
      success: true,
      data: [],
    }
  }

  async getJournalById(id: number): Promise<ApiResponse<JournalDto | null>> {
    const result = await this.db
      .select()
      .from(journal)
      .where(eq(journal.id, id));

    if (result.length > 0 ) {
      return {
        success: true,
        data: { ...result[0] },
      }
    }

    return {
      success: true,
      data: null,
    }
  }
}