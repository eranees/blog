import { Request, Response, NextFunction } from 'express';

import { AdminAuthService } from './admin-auth.service';
import { AdminLoginResponseDto } from './dto/admin-login-response.dto';
import { LoginDto } from '../core/dto/login.dto';
import { StatusCodes } from '../core/globals.constants';
import Validator from '../core/validators/validation.middleware';

export class AdminController {
  private readonly adminAuthService = new AdminAuthService();

  public async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const validationResult = await Validator.validateAndTransform(LoginDto, req.body);

      if (Array.isArray(validationResult)) {
        const errorMessages = validationResult
          .map((error) => Object.values(error.constraints))
          .flat();
        return res.status(StatusCodes.BadRequest).json({ errors: errorMessages });
      }

      const loginResponse: AdminLoginResponseDto = await this.adminAuthService.login(req.body);

      return res.status(StatusCodes.OK).json(loginResponse);
    } catch (error) {
      next(error);
    }
  }

  public testProtectedRoute(req: Request, res: Response): Response {
    return res.status(StatusCodes.OK).json({ message: 'Protected route accessed successfully' });
  }
}
