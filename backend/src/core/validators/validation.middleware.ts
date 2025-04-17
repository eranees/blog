import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export class Validator {
  public static async validateAndTransform<T extends object>(
    dtoClass: new () => T,
    requestBody: any,
  ): Promise<ValidationError[] | T> {
    const dtoInstance = plainToClass(dtoClass, requestBody);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      return errors;
    }
    return dtoInstance;
  }
}

export default Validator;
