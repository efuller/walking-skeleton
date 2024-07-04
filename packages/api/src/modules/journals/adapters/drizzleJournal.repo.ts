import { JournalRepo } from '@efuller/api/src/modules/journals/journal.repo';
import { ApiResponse } from '@efuller/shared/src/api';
import { DrizzleClient } from '@efuller/api/src/shared/persistence/drizzle/drizzleClient';
import { CreateJournalDto, journal, JournalDto } from '@efuller/api/src/shared/persistence/drizzle/schema';

export class DrizzleJournalRepo implements JournalRepo {
  constructor(private readonly db: DrizzleClient) {}

  async createJournal(journalDto: CreateJournalDto): Promise<ApiResponse<JournalDto | null>> {
    const dbClient = this.db.getClient();

    const result = await dbClient.insert(journal).values({
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
    const dbClient = this.db.getClient();
    const result = await dbClient.select().from(journal);

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
}