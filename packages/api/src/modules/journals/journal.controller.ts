import { Request, Response } from 'express';
import { JournalService } from './journal.service';
import { CreateJournalSchema } from '@efuller/shared/src/modules/journals/journals.dto';

export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  async create(req: Request, res: Response) {
    const journal = CreateJournalSchema.parse(req.body);

    const result = await this.journalService.createJournal(journal);

    res.status(201).json(result);
  }

  async getAll(req: Request, res: Response) {
    const result = await this.journalService.getJournals();
    res.status(200).json(result);
  }
}