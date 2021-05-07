import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { UserRegisterInputDTO } from './dtos/user.register.input.dto';
import { UserBadRequestException } from './exceptions/user.bad-request.exception';
import { UserForbiddenException } from './exceptions/user.forbidden.exception';
import { User, UserDocument } from './schema/user.schema';
import { PasswordUtils } from './utils/password.utils';

@Injectable()
export class AccountService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createAccount(data: UserRegisterInputDTO): Promise<UserDocument> {
    const doc = await this.userModel.create({
      ...data,
      password: await PasswordUtils.hash(data.password),
    });
    return doc;
  }

  async deactivateAccount(userId: UserDocument['_id']): Promise<UserDocument> {
    if (!userId) throw new UserBadRequestException();
    const updated = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { deactivate: true },
    );

    if (!updated) throw new UserForbiddenException();
    return updated;
  }

  async getByEmail(email: string): Promise<LeanDocument<UserDocument>> {
    const user = await this.userModel.findOne({ email }).lean();
    if (!user) throw new UserForbiddenException();
    return user;
  }

  async getAccount(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (!user) throw new UserForbiddenException();
    return user;
  }
}
