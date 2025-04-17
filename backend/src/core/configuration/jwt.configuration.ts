import { Utils } from '../utils/utils';

Utils.loadEnv();

export class JwtConfigService {
  get jwtAccessSecret(): string {
    return process.env.JWT_ACCESS_SECRET || '';
  }

  get jwtAccessExpiresIn(): string {
    return process.env.JWT_ACCESS_EXPIRES_IN || '1d';
  }
  get jwtRefreshSecret(): string {
    return process.env.JWT_REFRESH_SECRET || '';
  }

  get jwtRefreshExpiresIn(): string {
    return process.env.JWT_REFRESH_EXPIRES_IN || '7d';
  }

  get jwtVerifyExpiresIn(): string {
    return process.env.JWT_VERIFY_EXPIRES_IN || '15m';
  }
}
