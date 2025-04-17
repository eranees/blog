import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { BaseDto } from '../../core/dto/base.dto';

export class TagResponseDto extends BaseDto {
  @IsString()
  @Expose()
  name: string;
}
