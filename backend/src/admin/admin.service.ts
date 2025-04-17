import { FindOptionsWhere, Repository } from 'typeorm';

import { AdminEntity } from './entities/admin.entity';
import { AdminMapper } from './mapper/admin.mapper';
import { CustomException } from '../core/exception-filters/custom-exception';
import { StatusCodes } from '../core/globals.constants';
import { AdminResponseDto } from './dto/admin-response.dto';
import { logger } from '../core/logger/logger';
import { AppDataSource } from '../infra/database/typeorm-config.service';

export class AdminService {
  private readonly adminRepository: Repository<AdminEntity>;
  private readonly adminMapper: AdminMapper;

  constructor() {
    this.adminRepository = AppDataSource.manager.getRepository(AdminEntity);
    this.adminMapper = new AdminMapper();
  }

  public async findOne(options: FindOptionsWhere<AdminEntity>): Promise<AdminResponseDto> {
    try {
      const admin = await this.adminRepository.findOneBy(options);

      if (!admin) {
        throw new CustomException('Admin Not Found', StatusCodes.NotFound, false);
      }

      return this.adminMapper.toResponse(admin);
    } catch (error) {
      logger.error(`Error while getting admin: ${error.message}`, error);
      throw error;
    }
  }
}
