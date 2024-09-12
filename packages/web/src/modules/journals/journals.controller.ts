import { CreateJournalDto } from '@efuller/shared/src/modules/journals/journals.dto';
import { JournalsRepo } from './journals.repo';

export class JournalsController {
  constructor(private readonly journalsRepo: JournalsRepo) {}

  public async create(journal: CreateJournalDto) {
    await this.journalsRepo.create(journal);
  }
}