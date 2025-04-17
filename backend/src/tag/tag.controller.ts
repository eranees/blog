import { Request, Response, NextFunction } from 'express';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagService } from './tag.service';
import { AdminEntity } from '../admin/entities/admin.entity';
import { StatusCodes } from '../core/globals.constants';
import Validator from '../core/validators/validation.middleware';

export class TagController {
  private readonly tagService: TagService;

  constructor() {
    this.tagService = new TagService();
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const validationResult = await Validator.validateAndTransform(CreateTagDto, req.body);

    if (Array.isArray(validationResult)) {
      const errorMessages = validationResult
        .map((error) => Object.values(error.constraints))
        .flat();
      return res.status(StatusCodes.BadRequest).json({ errors: errorMessages });
    }

    try {
      const response = await this.tagService.create(req.body, req.user as AdminEntity);
      return res.status(StatusCodes.Created).json(response);
    } catch (error) {
      next(error);
    }
  }
}
