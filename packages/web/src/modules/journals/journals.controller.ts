import { JournalsRepo } from './journals.repo';
import { CreateJournalDto } from '@efuller/api/src/modules/journals/journal.dto';

export class JournalsController {
  constructor(private readonly journalsRepo: JournalsRepo) {}

  public async create(journal: CreateJournalDto) {
    await this.journalsRepo.create(journal);
  }
}