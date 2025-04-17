import { Request, Response, NextFunction } from 'express';

import { TUser } from '../../core.type';
import { CustomException } from '../../exception-filters/custom-exception';
import { StatusCodes, UserType } from '../../globals.constants';

export function RoleGuard(allowedRoles: UserType[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req?.user as TUser;

    if (!user || !user.userType) {
      throw new CustomException('Forbidden: No user or role found', StatusCodes.Forbidden);
    }

    if (!allowedRoles.includes(user.userType)) {
      throw new CustomException('Forbidden: Insufficient permissions', StatusCodes.Forbidden);
    }

    next();
  };
}
