import { Transform } from 'class-transformer';
import { IsOptional, IsInt, Min, IsEnum } from 'class-validator';

import { OrderDirection } from '../globals.constants';

export class QueryParamsDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  offset: number = 0;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsEnum(OrderDirection)
  @IsOptional()
  orderDirection?: OrderDirection = OrderDirection.Desc;
}
