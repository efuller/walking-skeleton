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