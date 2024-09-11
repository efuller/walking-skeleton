import { JournalRepo } from '@efuller/api/src/modules/journals/journal.repo';
import { ApiResponse } from '@efuller/shared/src/api';
import { DbClient } from '@efuller/api/src/shared/persistence/dbConnection/adapters/drizzleClient';
import { journal } from '@efuller/api/src/shared/persistence/drizzle/schema';
import { eq } from 'drizzle-orm';
import { CreateJournalDto, Journal } from '@efuller/shared/src/modules/journals/journals.dto';

export class DrizzleJournalRepo implements JournalRepo {
  constructor(private readonly db: DbClient) {}

  async createJournal(journalDto: CreateJournalDto): Promise<ApiResponse<Journal | null>> {

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

  async getJournals(): Promise<ApiResponse<Journal[]>> {
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

  async getJournalById(id: string): Promise<ApiResponse<Journal | null>> {
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