import { Request, Response } from 'express';
import { JournalService } from './journal.service';

export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  async create(req: Request, res: Response) {
    const { title } = req.body;

    const result = await this.journalService.createJournal(title);

    if (!result.success) {
      return res.status(500).json(result);
    }

    res.status(201).json(result);
  }
}