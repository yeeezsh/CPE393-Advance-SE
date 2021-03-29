import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class AccountService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createAccount(): Promise<UserDocument> {
    const doc = await this.userModel.create({
      username: '',
      password: '',
      email: '',
    });

    return doc;
  }

  async deactivateAccount(userId: UserDocument['_id']): Promise<UserDocument> {
    const updated = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { deactivate: true },
    );
    if (!updated) throw new Error('user not exisiting');
    return updated;
  }
}