import { HttpException, HttpStatus } from '@nestjs/common';

export class TagBadIdException extends HttpException {
  constructor() {
    super('Bad Tag Id', HttpStatus.BAD_REQUEST);
  }
}
