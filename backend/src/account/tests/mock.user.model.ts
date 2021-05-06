import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';

export const MOCK_USER_DOCUMENT = {
  _id: Types.ObjectId(),
  displayName: 'ds',
  username: '',
  email: 'a@b.c',
  password: '1234',
} as UserDocument;

export const MOCK_USER_VALUE = {
  create: jest
    .fn()
    .mockImplementation(() => Promise.resolve(MOCK_USER_DOCUMENT)),
  findOneAndUpdate: jest
    .fn()
    .mockImplementation(() => Promise.resolve(MOCK_USER_DOCUMENT)),
};

export const MOCK_USER_MODEL: Provider = {
  provide: getModelToken(User.name),
  useValue: MOCK_USER_VALUE,
};
