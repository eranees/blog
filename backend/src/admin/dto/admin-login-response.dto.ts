import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { AdminResponseDto } from './admin-response.dto';
import { TokenResponseDto } from '../../core/auth/dto/token-response.dto';

export class AdminLoginResponseDto extends TokenResponseDto {
  @ValidateNested()
  @Type(() => AdminResponseDto)
  readonly admin: AdminResponseDto;
}
