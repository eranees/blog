/* eslint-disable no-unused-vars */
export const knownJwtErrors = [
  'invalid signature',
  'jwt expired',
  'jwt malformed',
  'invalid token',
];

export enum AccountStatus {
  InActive = 'IN_ACTIVE',
  Active = 'ACTIVE',
  Deactivated = 'DEACTIVATED',
  Blacklist = 'BLACKLIST',
}

export enum Status {
  Active = 'ACTIVE',
  InActive = 'IN_ACTIVE',
}

export enum UserType {
  Admin = 'ADMIN',
  User = 'USER',
}

export enum TokenType {
  Access = 'ACCESS',
  Refresh = 'REFRESH',
  Verify = 'VERIFY',
}

export enum BlogStatus {
  Draft = 'draft',
  Published = 'published',
}

// Status Codes
export enum StatusCodes {
  Unauthorized = 401,
  BadRequest = 400,
  OK = 200,
  Created = 201,
  NoContent = 204,
  InternalServerError = 500,
  NotFound = 404,
  Forbidden = 403,
  Conflict = 409,
}

// Params List
export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum TagOrderBy {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Name = 'name',
}
