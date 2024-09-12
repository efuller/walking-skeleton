import { Request, Response } from 'express';
import { MembersService } from '@efuller/api/src/modules/members/members.service';
import { CreateUserSchema, MemberDto } from '@efuller/shared/src/modules/members/members.dto';
import { ApiResponse } from '@efuller/shared/src/api';

type CreateMemberResponse = ApiResponse<MemberDto | null>;

export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  async create(req: Request, res: Response) {
    const createMemberDto = CreateUserSchema.parse(req.body);

    const result = await this.membersService.createMember(createMemberDto);

    res.status(201).json(result);
  }

  async getMemberByEmail(req: Request, res: Response) {
    const email = req.params.email;

    const result = await this.membersService.getMemberByEmail(email);

    const response: CreateMemberResponse = {
      error: false,
      success: true,
      data: result,
    };

    if (!result) {
      return res.status(500).json({
        error: true,
        success: false,
        message: 'Member not found',
      });
    }

    res.status(200).json(response);
  }
}