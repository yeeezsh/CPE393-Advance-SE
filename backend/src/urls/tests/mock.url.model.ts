import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Url, UrlDocument } from '../schema/url.schema';

const now = new Date();

export const MOCK_URL_DOCUMENT = ({
  _id: Types.ObjectId(),
  owner: Types.ObjectId(),
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
};

export const MOCK_URL_MODEL: Provider = {
  provide: getModelToken(Url.name),
  useValue: MOCK_URL_VALUE,
};
