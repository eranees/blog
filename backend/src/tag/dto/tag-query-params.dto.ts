import { IsEnum, IsOptional, IsString } from 'class-validator';

import { QueryParamsDto } from '../../core/dto/query-params.dto';
import { TagOrderBy } from '../../core/globals.constants';

export class TagQueryParamListDto extends QueryParamsDto {
  @IsEnum(TagOrderBy)
  orderBy: TagOrderBy = TagOrderBy.CreatedAt;

  @IsOptional()
  @IsString()
  query?: string;
}
