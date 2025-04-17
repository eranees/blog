import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

import { PostgresConfigService } from '../../core/configuration/postgres.configuration';
import { Utils } from '../../core/utils/utils';

Utils.loadEnv();

const config = new PostgresConfigService();

export const AppDataSource = new DataSource({
  type: config.dbType,
  url: config.dbUrl,
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbName,
  synchronize: config.dbSynchronize,
  dropSchema: false,
  keepConnectionAlive: true,
  logging: true,
  autoLoadEntities: true,
  poolSize: config.dbPoolSize,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],

  cli: {
    entitiesDir: '../',
    migrationsDir: 'src/infra/database/migrations/',
    subscribersDir: 'subscriber',
  },
  extra: {
    max: config.dbMaxConnections,
    ssl: config.dbSslEnabled
      ? {
          rejectUnauthorized: config.dbRejectUnauthorized,
          ca: config.dbCa,
          key: config.dbKey,
          cert: config.dbCert,
        }
      : undefined,
  },
} as DataSourceOptions);
