import {
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { UserDuplicatedException } from '../user.duplicated.exception';

@Catch(MongoError)
export class UserMongoErrorFilterException implements ExceptionFilter {
  catch(exception: MongoError) {
    switch (exception.code) {
      case 11000: // index duplication
        throw new UserDuplicatedException(['email', 'username']);
      default:
        throw new InternalServerErrorException();
    }
  }
}
