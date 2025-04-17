import { JwtPayload } from 'jsonwebtoken';
import { PassportStatic } from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

import { AdminService } from '../../../admin/admin.service';
import { JwtConfigService } from '../../configuration/jwt.configuration';
import { TokenType, UserType } from '../../globals.constants';

export class AccessTokenStrategy {
  private readonly secret: string;
  private readonly jwtConfigService: JwtConfigService;
  private readonly adminService: AdminService;

  constructor() {
    this.jwtConfigService = new JwtConfigService();
    this.secret = this.jwtConfigService.jwtAccessSecret;
    this.adminService = new AdminService();
  }

  public register(passport: PassportStatic) {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.secret,
    };

    // jwt strategy
    passport.use(
      new JwtStrategy(options, async (payload: JwtPayload, done) => {
        try {
          if (payload.tokenType !== TokenType.Access) {
            return done(new Error('Unauthorized'), false);
          }

          if (payload.userType === UserType.Admin) {
            const admin = await this.adminService.findOne({ id: payload.sub });
            return done(null, admin);
          } else if (payload.userType === UserType.User) {
            // get customer from DB using payload
            // if not customer return done(new Error('Unauthorized'), false);
            // return customer and type here
          } else {
            return done(new Error('Unauthorized'), false);
          }
        } catch (err) {
          return done(err, false);
        }
      }),
    );
  }
}
