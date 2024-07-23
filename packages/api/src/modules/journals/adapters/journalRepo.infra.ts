import { InMemoryJournalRepo } from '@efuller/api/src/modules/journals/adapters/inMemoryJournal.repo';
import { CreateJournalDto } from '@efuller/api/src/modules/journals/journal.dto';
import { DrizzleClient } from '@efuller/api/src/shared/persistence/drizzle/drizzleClient';
import { DrizzleJournalRepo } from '@efuller/api/src/modules/journals/adapters/drizzleJournal.repo';
import { JournalRepo } from '@efuller/api/src/modules/journals/journal.repo';

describe('JournalRepo', () => {
  let drizzleClient: DrizzleClient;
  let journalRepos: JournalRepo[];

  beforeAll(async () => {
    drizzleClient = await DrizzleClient.create();
    journalRepos = [
      new InMemoryJournalRepo(),
      new DrizzleJournalRepo(drizzleClient),
    ];
  })

  afterAll(async () => {
    await drizzleClient.disconnect();
  });

  it('can retrieve a journal by its id', async () => {
    const journalDto: CreateJournalDto = {
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
