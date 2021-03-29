import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnExpectedServerException } from '../common/exceptions/un-expected.server.exception';
import { UserBadRequestException } from './exceptions/user.bad-request.exception';
import { UserForbiddenException } from './exceptions/user.forbidden.exception';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class AccountService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createAccount(): Promise<UserDocument> {
    try {
      const doc = await this.userModel.create({
        username: '',
        password: '',
        email: '',
      });

      return doc;
    } catch (err) {
      throw new UnExpectedServerException(err);
    }
  }

  async deactivateAccount(userId: UserDocument['_id']): Promise<UserDocument> {
    if (!userId) throw new UserBadRequestException();
    try {
      const updated = await this.userModel.findOneAndUpdate(
        { _id: userId },
        { deactivate: true },
      );
      if (!updated) throw new UserForbiddenException();
      return updated;
    } catch (err) {
      throw new UnExpectedServerException(err);
    }
  }
}
