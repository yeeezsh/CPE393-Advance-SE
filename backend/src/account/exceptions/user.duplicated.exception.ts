import { HttpException, HttpStatus } from '@nestjs/common';

export class UserDuplicatedException extends HttpException {
  constructor(keys: string[]) {
    super(`Duplicated keys: ${keys.toString()}`, HttpStatus.BAD_REQUEST);
  }
}
