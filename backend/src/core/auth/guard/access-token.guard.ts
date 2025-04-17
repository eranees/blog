import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import { TUser } from '../../core.type';
import { CustomException } from '../../exception-filters/custom-exception';
import { knownJwtErrors, StatusCodes } from '../../globals.constants';

export function AccessTokenGuard(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', { session: false }, (err: any, user: TUser, info: any) => {
    if (err) {
      const message: string = err?.message || 'Internal server error';
      throw new CustomException(message, StatusCodes.InternalServerError);
    }

    if (!user) {
      const passportMessage: string = info?.message;

      const message: string = knownJwtErrors.includes(passportMessage)
        ? 'Unauthorized'
        : passportMessage || 'Unauthorized';

      throw new CustomException(message, StatusCodes.Unauthorized);
    }

    req.user = user;

    next();
  })(req, res, next);
}
