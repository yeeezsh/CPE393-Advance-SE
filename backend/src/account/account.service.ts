import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class AccountService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createAccount(): Promise<Omit<UserDocument, 'password'>> {
    const doc = await this.userModel.create({
      username: '',
      password: '',
      email: '',
    });
    return doc;
  }
}
