import express, { Router } from 'express';

import { TagController } from './tag.controller';
import { AccessTokenGuard } from '../core/auth/guard/access-token.guard';
import { RoleGuard } from '../core/auth/guard/roles.guard';
import { UserType } from '../core/globals.constants';

export class TagRouter {
  public readonly router: Router;
  private readonly tagController: TagController;

  constructor() {
    this.router = express.Router();
    this.tagController = new TagController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/',
      AccessTokenGuard,
      RoleGuard([UserType.Admin]),
      this.tagController.create.bind(this.tagController),
    );

    this.router.patch(
      '/:id',
      AccessTokenGuard,
      RoleGuard([UserType.Admin]),
      this.tagController.update.bind(this.tagController),
    );

    this.router.get(
      '/:id',
      AccessTokenGuard,
      RoleGuard([UserType.Admin]),
      this.tagController.findOne.bind(this.tagController),
    );

    this.router.get(
      '/',
      AccessTokenGuard,
      RoleGuard([UserType.Admin]),
      this.tagController.findAll.bind(this.tagController),
    );
  }
}
