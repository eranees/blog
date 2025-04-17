import { Expose } from 'class-transformer';
import { IsString, IsEmail, IsEnum } from 'class-validator';

import { BaseDto } from '../../core/dto/base.dto';
import { AccountStatus, UserType } from '../../core/globals.constants';

export class AdminResponseDto extends BaseDto {
  @IsString()
  @Expose()
  readonly name: string;

  @IsString()
  @Expose()
  readonly username: string;

  @IsEmail()
  @Expose()
  readonly email: string;

  @IsEnum(AccountStatus)
  @Expose()
  readonly status: AccountStatus;

  @IsEnum(UserType)
  @Expose()
  readonly userType: UserType;
}
