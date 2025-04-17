import { TUser } from '../../core.type';
import { TokenType, UserType } from '../../globals.constants';

export type JwtPayload = {
  sub: string;
  email: string;
  userType: UserType;
  tokenType?: TokenType;
  id?: string;
};

export type TokenResponse = {
  token: string;
  tokenExpiresIn: number;
};

export type EncodeDataArgs = {
  user: TUser;
  userType: UserType;
  tokenType?: TokenType;
};
