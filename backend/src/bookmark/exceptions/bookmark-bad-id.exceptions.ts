import { HttpException, HttpStatus } from '@nestjs/common';

export class BookmarkBadIdException extends HttpException {
  constructor() {
    super('Bad Bookmark Id', HttpStatus.BAD_REQUEST);
  }
}
