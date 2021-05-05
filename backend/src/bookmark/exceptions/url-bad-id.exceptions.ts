import { HttpException, HttpStatus } from '@nestjs/common';

export class UrlBadIdException extends HttpException {
  constructor() {
    super('Bad Url Id', HttpStatus.BAD_REQUEST);
  }
}
