import { Utils } from '../utils/utils';

Utils.loadEnv();

export class PostgresConfigService {
  get dbType(): string {
    return process.env.DATABASE_TYPE || 'postgres';
  }

  get dbUrl(): string | undefined {
    return process.env.DATABASE_URL || undefined;
  }

  get dbHost(): string {
    return process.env.POSTGRES_HOST || 'localhost';
  }

  get dbPort(): number {
    return Number(process.env.POSTGRES_PORT) || 5432;
  }

  get dbUsername(): string {
    return process.env.POSTGRES_USERNAME || 'postgres';
  }

  get dbPassword(): string {
    return process.env.POSTGRES_PASSWORD || 'password';
  }

  get dbName(): string {
    return process.env.POSTGRES_DB || 'my_db';
  }

  get dbSynchronize(): boolean {
    return process.env.DATABASE_SYNCHRONIZE === 'true';
  }

  get dbPoolSize(): number {
    return Number(process.env.DATABASE_POOL_SIZE) || 10;
  }

  get dbMaxConnections(): number {
    return Number(process.env.DATABASE_MAX_CONNECTIONS) || 100;
  }

  get dbSslEnabled(): boolean {
    return process.env.DATABASE_SSL_ENABLED === 'true';
  }

  get dbRejectUnauthorized(): boolean {
    return process.env.DATABASE_REJECT_UNAUTHORIZED === 'true';
  }

  get dbCa(): string | undefined {
    return process.env.DATABASE_CA;
  }

  get dbKey(): string | undefined {
    return process.env.DATABASE_KEY;
  }

  get dbCert(): string | undefined {
    return process.env.DATABASE_CERT;
  }
}
