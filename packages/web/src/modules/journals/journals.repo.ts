import { action, makeObservable, observable } from 'mobx';
import { JournalsApi } from '@efuller/shared/src/api/journalsApi';
import { CreateJournalDto, JournalDto } from '@efuller/shared/src/modules/journals/journals.dto';

export class JournalsRepo {
  public journals: JournalDto[] = [];

  constructor(private readonly api: JournalsApi) {
    makeObservable(this, {
      journals: observable,
      load: action,
      create: action,
    });
  }

  public async load() {
    const response = await this.api.getJournals();
    if (response.success) {
      this.journals = response.data;
    }
  }

  public async create(journal: CreateJournalDto) {
    const response = await this.api.create(journal);
    if (response.success) {
      this.journals.push(response.data);
    }
  }
}