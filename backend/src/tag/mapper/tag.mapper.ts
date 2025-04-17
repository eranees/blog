import { instanceToPlain, plainToClass } from 'class-transformer';

import { TagResponseDto } from '../dto/tag-response.dto';
import { TagEntity } from '../entities/tag.entity';

export class TagMapper {
  toPersistence(tagDto: any): TagEntity {
    const data = instanceToPlain(tagDto);
    return plainToClass(TagEntity, data);
  }

  toResponse(data: TagEntity): TagResponseDto {
    const d = instanceToPlain(data);
    return plainToClass(TagResponseDto, d, { excludeExtraneousValues: true });
  }

  toResponseList(data: TagEntity[]): TagResponseDto[] {
    return data.map((item) => this.toResponse(item));
  }
}
