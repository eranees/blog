import { App } from './app';
import { AppConfigService } from './core/configuration/app.configuration';
import { logger } from './core/logger/logger';
import { AppDataSource } from './infra/database/typeorm-config.service';

const appConfig: AppConfigService = new AppConfigService();

AppDataSource.initialize()
  .then(() => {
    logger.info('🚀 Database connected successfully');
    const app = new App(appConfig);
    app.listen();
  })

  .catch((err) => {
    logger.error('Failed to connect to database: ', err);
    process.exit(1);
  });
