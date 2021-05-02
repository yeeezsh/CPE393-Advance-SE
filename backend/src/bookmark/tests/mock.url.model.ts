import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Bookmark, UrlDocument } from '../schema/bookmark.schema';

const now = new Date();

export const MOCK_URL_DOCUMENT = ({
  _id: Types.ObjectId().toHexString(),
  owner: Types.ObjectId().toHexString(),
  original: 'https://docs.google.com',
  domain: 'docs.google.com',
  note: '',
  tags: [],
  createAt: now,
  updateAt: now,
} as unknown) as UrlDocument;

export const MOCK_URL_VALUE = {
  create: jest
    .fn()
    .mockImplementation(() => Promise.resolve(MOCK_URL_DOCUMENT)),
  findByIdAndUpdate: jest
    .fn()
    .mockImplementation(() => Promise.resolve(MOCK_URL_DOCUMENT)),
  find: jest.fn().mockReturnThis(),
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  lean: jest.fn().mockReturnThis(),
};

export const MOCK_URL_MODEL: Provider = {
  provide: getModelToken(Bookmark.name),
  useValue: MOCK_URL_VALUE,
};