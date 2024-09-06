import { JournalDto } from '@efuller/api/src/modules/journals/journal.dto';
import { JournalsApi } from '@efuller/shared/src/api';

export class JournalsRepo {
  public journals: JournalDto[] = [];

  constructor(private readonly api: JournalsApi) {}

  public async load() {
    this.journals = [];
  }
}