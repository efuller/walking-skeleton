import { JournalRepo } from '@efuller/api/src/modules/journals/journal.repo';
import { PrismaDbClient } from '@efuller/api/src/shared/persistence/prisma/prismaDbClient';
import { CreateJournalDto, JournalDto } from '@efuller/api/src/modules/journals/journal.dto';
import { ApiResponse } from '@efuller/shared/src/api';

export class PrismaJournalRepo implements JournalRepo {
  constructor(private readonly db: PrismaDbClient) {}

  async createJournal(user: CreateJournalDto): Promise<ApiResponse<JournalDto>> {
    const dbClient = this.db.getClient();
    const { title, content } = user;

    const result = await dbClient.journal.create({
      data: {
        title,
        content,
      },
    });

    return {
      success: true,
      data: { ...result },
    }
  }

  async getJournals(): Promise<ApiResponse<JournalDto[]>> {
    const dbClient = this.db.getClient();

    const result = await dbClient.journal.findMany();

    if (!result.length) {
      return {
        success: true,
        data: [],
      }
    }

    return {
      success: true,
      data: result.map((journal: JournalDto) => ({ ...journal })),
    }
  }
}
