import { ApiServer } from '../http/apiServer';
import { JournalController } from '@efuller/api/src/modules/journals/journal.controller';
import { JournalService } from '@efuller/api/src/modules/journals/journal.service';
import { Database } from '@efuller/api/src/shared/persistence/database';
import { PrismaDbClient } from '@efuller/api/src/shared/persistence/prisma/prismaDbClient';
import { PrismaJournalRepo } from '@efuller/api/src/modules/journals/adapters/prismaJournal.repo';

export class CompositionRoot {
  private readonly db: Database;
  private readonly apiServer: ApiServer;

  constructor() {
    this.db = this.createDatabase();
    this.apiServer = this.createApiServer();
  }

  private createDatabase() {
    const prismaClient = new PrismaDbClient();

    return {
      journals: new PrismaJournalRepo(prismaClient),
      reset: async () => {
        await prismaClient.reset();
      }
    }
  }

  createApiServer() {
    const journalService = new JournalService(this.db);
    const journalController = new JournalController(journalService);

    return new ApiServer({ journal: journalController });
  }

  getApiServer() {
    return this.apiServer;
  }

  getDatabase() {
    return this.db;
  }
}