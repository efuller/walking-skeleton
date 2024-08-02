import { Request, Response } from 'express';
import { MembersService } from '@efuller/api/src/modules/members/members.service';
import { CreateMemberCommand } from '@efuller/shared/src/modules/members/commands';

export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  async create(req: Request, res: Response) {
    const member: CreateMemberCommand = req.body;

    if (!member) {
      throw new Error('Member data is required');
    }

    const result = await this.membersService.createMember(member);

    if (!result) {
      return res.status(500).json(result);
    }

    res.status(201).json(result);
  }

  async getMemberByEmail(req: Request, res: Response) {
    const email = req.params.email;

    const result = await this.membersService.getMemberByEmail(email);

    if (!result) {
      return res.status(500).json(result);
    }

    res.status(200).json(result);
  }
}