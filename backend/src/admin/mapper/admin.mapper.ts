import { instanceToPlain, plainToClass } from 'class-transformer';

import { AdminResponseDto } from '../dto/admin-response.dto';
import { AdminEntity } from '../entities/admin.entity';

export class AdminMapper {
  toPersistence(userDto: any): AdminEntity {
    const data = instanceToPlain(userDto);
    const user = plainToClass(AdminEntity, data);
    return user;
  }

  toResponse(data: any): AdminResponseDto {
    const d = instanceToPlain(data);
    const response = plainToClass(AdminResponseDto, d, { excludeExtraneousValues: true });
    return response;
  }
}
