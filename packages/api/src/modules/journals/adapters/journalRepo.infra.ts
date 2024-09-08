import { v4 as uuidv4 } from 'uuid';
import { InMemoryJournalRepo } from '@efuller/api/src/modules/journals/adapters/inMemoryJournal.repo';
import { DrizzleClient } from '@efuller/api/src/shared/persistence/dbConnection/adapters/drizzleClient';
import { DrizzleJournalRepo } from '@efuller/api/src/modules/journals/adapters/drizzleJournal.repo';
import { JournalRepo } from '@efuller/api/src/modules/journals/journal.repo';
import { CreateJournalCommand } from '@efuller/shared/src/modules/journals/journals.dto';

describe('JournalRepo', () => {
  let drizzleClient: DrizzleClient;
  let journalRepos: JournalRepo[];

  beforeAll(async () => {
    drizzleClient = await DrizzleClient.create();
    journalRepos = [
      new InMemoryJournalRepo(),
      new DrizzleJournalRepo(drizzleClient.getClient()),
    ];
  })

  afterAll(async () => {
    await drizzleClient.disconnect();
  });

  it('can retrieve a journal by its id', async () => {
    const journalDto: CreateJournalCommand = {
      id: uuidv4(),
      title: 'Test',
      content: 'Test Content',
    };

    for (const journalRepo of journalRepos) {
      const journal = await journalRepo.createJournal(journalDto);

      expect(journal.success).toBeTruthy();
      expect(journal.data).not.toBeNull();
      expect(journal.data?.title).toBe(journalDto.title);

      const retrievedJournal = await journalRepo.getJournalById(journal.data!.id);

      expect(retrievedJournal.success).toBeTruthy();
      expect(retrievedJournal.data!.id).toBe(journal.data!.id);
    }
  });
});
