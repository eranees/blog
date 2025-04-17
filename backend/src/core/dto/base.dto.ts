import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class BaseDto {
  @IsString()
  @Expose()
  readonly id: string;

  @IsString()
  @Expose()
  readonly createdAt: Date;

  @IsString()
  @Expose()
  readonly updatedAt: Date;

  @IsString()
  @Expose()
  readonly deletedAt: Date;

  @IsString()
  @Expose()
  readonly createdBy: string;

  @IsString()
  @Expose()
  readonly updatedBy: string;
}
