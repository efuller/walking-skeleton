import { JournalService } from '@efuller/api/src/modules/journals/journal.service';
import { MembersService } from '@efuller/api/src/modules/members/members.service';

export interface AppInterface {
  journals: JournalService;
  members: MembersService;
}
