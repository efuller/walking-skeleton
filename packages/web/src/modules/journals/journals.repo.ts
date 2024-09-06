import { JournalDto, CreateJournalDto } from '@efuller/api/src/modules/journals/journal.dto';
import { JournalsApi } from '@efuller/shared/src/api';

export class JournalsRepo {
  public journals: JournalDto[] = [];

  constructor(private readonly api: JournalsApi) {}

  public async load() {
    this.journals = [];
  }

  public async create(journal: CreateJournalDto) {
    const response = await this.api.create(journal);
    if (response.success) {
      this.journals.push(response.data);
    }
  }
}