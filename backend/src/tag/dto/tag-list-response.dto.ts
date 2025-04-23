import { Expose } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';

import { TagResponseDto } from './tag-response.dto';

export class TagListResponseDto {
  @IsArray()
  @Expose()
  tags: TagResponseDto[];

  @IsNumber()
  @Expose()
  count: number;
}
