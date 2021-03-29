import { HttpException, HttpStatus } from '@nestjs/common';

export class UserBadRequestException extends HttpException {
  constructor() {
    super('Bad request', HttpStatus.BAD_REQUEST);
  }
}
