import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { v4 as uuidV4 } from 'uuid';

import { JwtConfigService } from '../configuration/jwt.configuration';
import { TokenType } from '../globals.constants';
import { TokenResponseDto } from './dto/token-response.dto';
import { EncodeDataArgs, TokenResponse } from './type/auth.type';

export class AuthService {
  private readonly jwtConfigService: JwtConfigService;
  constructor() {
    this.jwtConfigService = new JwtConfigService();
  }

  public getAccessToken(data: EncodeDataArgs): TokenResponse {
    const id = uuidV4();
    const tokenType = data.tokenType || TokenType.Access;
    const secret = this.jwtConfigService.jwtAccessSecret;

    const expiresIn =
      tokenType === TokenType.Verify
        ? this.jwtConfigService.jwtVerifyExpiresIn
        : this.jwtConfigService.jwtAccessExpiresIn;

    if (!secret || !expiresIn) {
      throw new Error('Invalid JWT configuration: Secret or expiresIn is missing');
    }

    const payload: JwtPayload = {
      sub: data.user.id,
      email: data.user.email,
      userType: data.userType,
      tokenType,
      id,
    };

    const options: SignOptions = {
      expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
    };

    const accessToken = jwt.sign(payload, this.jwtConfigService.jwtAccessSecret, options);
    const decodedToken = jwt.decode(accessToken) as JwtPayload;

    if (!decodedToken || !decodedToken.exp) {
      throw new Error('Failed to decode JWT or expiration not found');
    }

    return { token: accessToken, tokenExpiresIn: decodedToken.exp };
  }

  public getRefreshToken(data: EncodeDataArgs): TokenResponse {
    const payload: JwtPayload = {
      sub: data.user.id,
      email: data.user.email,
      userType: data.userType,
      tokenType: data.tokenType || TokenType.Refresh,
    };

    const options: SignOptions = {
      expiresIn: this.jwtConfigService.jwtRefreshExpiresIn as jwt.SignOptions['expiresIn'],
    };

    const refreshToken = jwt.sign(payload, this.jwtConfigService.jwtRefreshSecret, options);

    const decoded = jwt.decode(refreshToken) as JwtPayload;

    return { token: refreshToken, tokenExpiresIn: decoded.exp! };
  }

  async getTokens(data: EncodeDataArgs): Promise<TokenResponseDto> {
    const accessToken = await this.getAccessToken(data);
    const refreshToken = await this.getRefreshToken(data);

    return {
      accessToken: accessToken.token,
      accessTokenExpiresIn: accessToken.tokenExpiresIn,
      refreshToken: refreshToken.token,
      refreshTokenExpiresIn: refreshToken.tokenExpiresIn,
    };
  }

  async refreshTokens(data: EncodeDataArgs): Promise<TokenResponseDto> {
    return await this.getTokens(data);
  }
}
