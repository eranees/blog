import { Expose } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @Expose()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @Expose()
  @IsNotEmpty()
  readonly password: string;
}
