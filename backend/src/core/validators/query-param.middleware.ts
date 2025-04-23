import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class QueryParamValidator {
  public static async validateAndTransform<T extends object>(
    dtoClass: new () => T,
    data: any,
  ): Promise<[T | null, { field: string; message: string }[] | null]> {
    const dtoInstance = plainToInstance(dtoClass, data, {
      enableImplicitConversion: true,
      exposeDefaultValues: true,
    });

    const errors = await validate(dtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => {
        return {
          field: error?.property,
          message: Object.values(error?.constraints || {}).join(', '),
        };
      });
      return [null, formattedErrors];
    }

    return [dtoInstance, null];
  }
}
