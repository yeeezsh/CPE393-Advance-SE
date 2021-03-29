import { HttpException, HttpStatus } from '@nestjs/common';

export class UserForbiddenException extends HttpException {
  constructor() {
    super('User not existing', HttpStatus.FORBIDDEN);
  }
}
