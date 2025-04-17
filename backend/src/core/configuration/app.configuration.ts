import { Utils } from '../utils/utils';

Utils.loadEnv();
export class AppConfigService {
  get nodeEnv(): string {
    return process.env.NODE_ENV || 'development';
  }

  get port(): number {
    return Number(process.env.APP_PORT) || 3000;
  }

  get name(): string {
    return process.env.APP_NAME || 'Blog';
  }

  get description(): string {
    return process.env.APP_DESCRIPTION || 'This is a blog application';
  }

  get server(): string {
    return process.env.APP_SERVER || 'http://localhost';
  }

  get version(): string {
    return process.env.APP_VERSION || '1.0.0';
  }

  get frontEndAppUrl(): string {
    return process.env.FRONT_END_APP_URL || 'http://localhost:4000';
  }
}
