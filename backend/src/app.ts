import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import passport from 'passport';

import { AdminRouter } from './admin/admin.route';
import { AccessTokenStrategy } from './core/auth/strategies/access-token.strategy';
import { AppConfigService } from './core/configuration/app.configuration';
import { GlobalExceptionFilter } from './core/exception-filters/global-exception.filter';
import { logger } from './core/logger/logger';
import { TagRouter } from './tag/tag.route';

export class App {
  public readonly app: Application;
  public readonly port: number;
  public readonly serverURL: string;

  constructor(private appConfig: AppConfigService) {
    this.app = express();
    this.port = this.appConfig.port;
    this.serverURL = appConfig.server;

    this.init();
  }

  private init() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());

    this.setUpRoutes();

    this.app.use(passport.initialize());
    new AccessTokenStrategy().register(passport);

    this.ping();
    this.app.use(GlobalExceptionFilter.handle);
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`🚀 Server running on ${this.serverURL}:${this.port}`);
    });
  }

  public ping() {
    this.app.get('/ping', (req: Request, res: Response) => {
      res.json({
        name: this.appConfig.name,
        version: this.appConfig.version,
        description: this.appConfig.description,
      });
    });
  }

  private setUpRoutes() {
    const apiRouter = express.Router();
    this.app.use('/api/v1', apiRouter);

    const adminRouter = express.Router();
    apiRouter.use('/admin', adminRouter);

    const adminModuleRouter = new AdminRouter();
    adminRouter.use('/', adminModuleRouter.router);

    const tagRouter = new TagRouter();
    adminRouter.use('/tag', tagRouter.router);
  }

  public getServer() {
    return this.app;
  }
}
