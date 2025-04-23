import { FindOptionsWhere, ILike, Repository } from 'typeorm';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagListResponseDto } from './dto/tag-list-response.dto';
import { TagQueryParamListDto } from './dto/tag-query-params.dto';
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

  public async update(id: string, body: UpdateTagDto, admin: AdminEntity): Promise<TagResponseDto> {
    try {
      const tag = await this.tagRepository.findOneBy({ id });
      if (!tag) {
        throw new CustomException('Tag not found', StatusCodes.NotFound, false);
      }

      if (body.name) {
        const existing = await this.tagRepository.findOneBy({ name: body.name });
        if (existing && existing.id !== id) {
          throw new CustomException(
            'Tag with this name already exists',
            StatusCodes.Conflict,
            false,
          );
        }
      }

      const updated = this.tagMapper.toPersistence({
        ...tag,
        ...body,
        updatedBy: admin.id,
      });

      const saved = await this.tagRepository.save(updated);
      return this.tagMapper.toResponse(saved);
    } catch (error) {
      logger.error('Error updating tag:', error);
      throw error;
    }
  }

  public async findOne(id: string): Promise<TagResponseDto> {
    try {
      const tag = await this.tagRepository.findOneBy({ id });
      if (!tag) {
        throw new CustomException('Tag not found', StatusCodes.NotFound, false);
      }

      return this.tagMapper.toResponse(tag);
    } catch (error) {
      logger.error('Error in findOne tag:', error);
      throw error;
    }
  }

  public async findAll(queryParams: TagQueryParamListDto): Promise<TagListResponseDto> {
    const { limit, offset, query, orderBy, orderDirection } = queryParams;
    const whereCondition: FindOptionsWhere<TagEntity> = {};

    if (query) {
      whereCondition.name = ILike(`%${query}%`);
    }

    try {
      const [tags, count] = await this.tagRepository.findAndCount({
        where: whereCondition,
        order: {
          [orderBy]: orderDirection,
        },
        take: limit,
        skip: offset,
      });

      return {
        tags: this.tagMapper.toResponseList(tags),
        count,
      };
    } catch (error) {
      logger.error('Error in findAll tag:', error);
      throw error;
    }
  }
}
