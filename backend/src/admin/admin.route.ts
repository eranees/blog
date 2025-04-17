// admin.router.ts
import express, { Router } from 'express';

import { AdminController } from './admin.controller';
import { AccessTokenGuard } from '../core/auth/guard/access-token.guard';
import { RoleGuard } from '../core/auth/guard/roles.guard';
import { UserType } from '../core/globals.constants';

export class AdminRouter {
  public readonly router: Router;
  private readonly adminController: AdminController;

  constructor() {
    this.router = express.Router();
    this.adminController = new AdminController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/login', this.adminController.login.bind(this.adminController));
    this.router.get(
      '/protected',
      AccessTokenGuard,
      RoleGuard([UserType.Admin]),
      this.adminController.testProtectedRoute.bind(this.adminController),
    );
  }
}
