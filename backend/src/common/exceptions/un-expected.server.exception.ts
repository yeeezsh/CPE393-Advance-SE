import { HttpException, HttpStatus } from '@nestjs/common';

export class UnExpectedServerException extends HttpException {
  constructor(msg?: string) {
    super(`Unexpected Server Error: ${msg}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
