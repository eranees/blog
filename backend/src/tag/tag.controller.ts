import { Request, Response, NextFunction } from 'express';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagQueryParamListDto } from './dto/tag-query-params.dto';
import { TagService } from './tag.service';
import { AdminEntity } from '../admin/entities/admin.entity';
import { StatusCodes } from '../core/globals.constants';
import { QueryParamValidator } from '../core/validators/query-param.middleware';
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

  public async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const validationResult = await Validator.validateAndTransform(CreateTagDto, req.body);

    if (Array.isArray(validationResult)) {
      const errorMessages = validationResult
        .map((error) => Object.values(error.constraints))
        .flat();
      return res.status(StatusCodes.BadRequest).json({ errors: errorMessages });
    }

    try {
      const id = req.params?.id;
      if (!id) return res.status(StatusCodes.BadRequest).json({ error: 'Tag ID is required' });

      const response = await this.tagService.update(id, req.body, req.user as AdminEntity);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async findOne(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const id = req.params?.id;
      if (!id) return res.status(StatusCodes.BadRequest).json({ error: 'Tag ID is required' });

      const response = await this.tagService.findOne(id);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async findAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const [dtoInstance, errors] = await QueryParamValidator.validateAndTransform(
        TagQueryParamListDto,
        req.query,
      );
      if (Array.isArray(errors)) {
        return res.status(400).json({ message: 'Invalid Value For Query Params', errors: errors });
      }

      const response = await this.tagService.findAll(dtoInstance);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}
