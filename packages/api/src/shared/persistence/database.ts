import { JournalRepo } from '@efuller/api/src/modules/journals/journal.repo';

export interface Database {
  journals: JournalRepo;
}
