import { Request, Response } from 'express';
import { JournalService } from './journal.service';
import { CreateJournalDto } from '@efuller/api/src/modules/journals/journal.dto';

export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  async create(req: Request, res: Response) {
    const journal: CreateJournalDto = req.body;

    const result = await this.journalService.createJournal(journal);

    if (!result.success) {
      return res.status(500).json(result);
    }

    res.status(201).json(result);
  }

  async getAll(req: Request, res: Response) {
    const result = await this.journalService.getJournals();

    if (!result.success) {
      return res.status(500).json(result);
    }

    res.status(200).json(result);
  }
}