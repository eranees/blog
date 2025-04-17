import { Repository } from 'typeorm';

import { AdminLoginResponseDto } from './dto/admin-login-response.dto';
import { AdminEntity } from './entities/admin.entity';
import { AdminMapper } from './mapper/admin.mapper';
import { AuthService } from '../core/auth/auth.service';
import { CryptoService } from '../core/crypto/crypto.service';
import { LoginDto } from '../core/dto/login.dto';
import { CustomException } from '../core/exception-filters/custom-exception';
import { StatusCodes } from '../core/globals.constants';
import { logger } from '../core/logger/logger';
import { AppDataSource } from '../infra/database/typeorm-config.service';

export class AdminAuthService {
  private readonly adminRepository: Repository<AdminEntity>;
  private readonly cryptoService: CryptoService;
  private readonly authService: AuthService;
  private readonly adminMapper: AdminMapper;

  constructor() {
    this.cryptoService = new CryptoService();
    this.adminMapper = new AdminMapper();
    this.authService = new AuthService();
    this.adminRepository = AppDataSource.manager.getRepository(AdminEntity);
  }

  public async login(body: LoginDto): Promise<AdminLoginResponseDto> {
    try {
      const admin = await this.adminRepository.findOneBy({ email: body.email });

      if (!admin) {
        throw new CustomException('Invalid email or password', StatusCodes.Unauthorized, false);
      }

      const isPasswordValid = await this.cryptoService.isMatch(body.password, admin.password);
      if (!isPasswordValid) {
        throw new CustomException('Invalid email or password', StatusCodes.Unauthorized, false);
      }

      const tokens = await this.authService.getTokens({
        user: admin,
        userType: admin.userType,
      });

      return {
        admin: this.adminMapper.toResponse(admin),
        ...tokens,
      };
    } catch (error) {
      logger.error(`Admin login failed: ${error.message}`, error);
      throw error;
    }
  }
}
