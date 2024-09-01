import { JournalService } from '@efuller/api/src/modules/journals/journal.service';
import { MembersService } from '@efuller/api/src/modules/members/members.service';
import { Middleware } from '@efuller/api/src/shared/http/middleware/middleware';

export interface AppInterface {
  journals: JournalService;
  members: MembersService;
  authMiddleware: Middleware
}
