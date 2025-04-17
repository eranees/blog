import { Repository } from 'typeorm';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagResponseDto } from './dto/tag-response.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagEntity } from './entities/tag.entity';
import { TagMapper } from './mapper/tag.mapper';
import { AdminEntity } from '../admin/entities/admin.entity';
import { CustomException } from '../core/exception-filters/custom-exception';
import { StatusCodes } from '../core/globals.constants';
import { logger } from '../core/logger/logger';
import { AppDataSource } from '../infra/database/typeorm-config.service';

export class TagService {
  private readonly tagRepository: Repository<TagEntity>;
  private readonly tagMapper: TagMapper;

  constructor() {
    this.tagMapper = new TagMapper();
    this.tagRepository = AppDataSource.manager.getRepository(TagEntity);
  }

  public async create(body: CreateTagDto, admin: AdminEntity): Promise<TagResponseDto> {
    try {
      const existing = await this.tagRepository.findOneBy({ name: body.name });
      if (existing) {
        throw new CustomException('Tag already exists', StatusCodes.Conflict, false);
      }

      const tag = this.tagMapper.toPersistence({
        ...body,
        createdBy: admin?.id,
        updatedBy: admin?.id,
      });
      return await this.tagRepository.save(tag);
    } catch (error) {
      logger.error('Error creating tag:', error);
      throw error;
    }
  }

  public async update(id: string, body: UpdateTagDto): Promise<TagResponseDto> {
    try {
      const tag = await this.tagRepository.findOneBy({ id });
      if (!tag) {
        throw new CustomException('Tag not found', StatusCodes.NotFound, false);
      }

      const updated = this.tagMapper.toPersistence({
        ...tag,
        ...body,
        updatedBy: tag.updatedBy,
      });
      const saved = await this.tagRepository.save(updated);
      return this.tagMapper.toResponse(saved);
    } catch (error) {
      logger.error('Error updating tag:', error);
      throw error;
    }
  }
}
