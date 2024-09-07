import { v4 as uuidv4 } from 'uuid';
import { JournalDto } from '@efuller/api/src/modules/journals/journal.dto';

export class JournalBuilder {
  private readonly journalProps: JournalDto;

  constructor() {
    this.journalProps = {
      id: '',
      title: 'Test Journal',
      content: 'This is a test journal entry',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  withRandomTitle(): JournalBuilder {
    this.journalProps.title = `Test Journal ${Math.random()}`;
    return this;
  }

  withRandomContent(): JournalBuilder {
    this.journalProps.content = `This is a test journal entry ${Math.random()}`;
    return this;
  }

  withId(id: string = ''): JournalBuilder {
    if (!id) {
      id = uuidv4();
    }
    this.journalProps.id = id;
    return this;
  }

  withTitle(title: string): JournalBuilder {
    this.journalProps.title = title;
    return this;
  }

  withContent(content: string): JournalBuilder {
    this.journalProps.content = content;
    return this;
  }

  build(): JournalDto {
    return this.journalProps;
  }
}