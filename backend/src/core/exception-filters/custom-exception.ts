export class CustomException extends Error {
  public readonly success: boolean;
  public readonly statusCode: number;

  constructor(message: string, statusCode: number, success = false) {
    super(message);
    this.name = this.constructor.name;
    this.success = success;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
