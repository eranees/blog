import { Expose } from 'class-transformer';
import { IsString, IsInt, IsPositive } from 'class-validator';

export class TokenResponseDto {
  @IsString()
  @Expose()
  accessToken: string;

  @IsString()
  @Expose()
  refreshToken: string;

  @IsInt()
  @IsPositive()
  @Expose()
  accessTokenExpiresIn: number;

  @IsInt()
  @IsPositive()
  @Expose()
  refreshTokenExpiresIn: number;
}
