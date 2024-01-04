import { Database } from '@efuller/api/src/shared/persistence/database/database';
import { ApiResponse } from '@efuller/shared/src/api';

export class JournalService {
  constructor(private readonly db: Database) {}

  async createJournal(title: string, content: string): Promise<ApiResponse> {
    const dbClient = this.db.getClient();

    const result = await dbClient.journal.create({
      data: {
        title,
        content,
      },
    });

    return {
      success: true,
      data: { title: result.title, content: result.content },
    }
  }
}