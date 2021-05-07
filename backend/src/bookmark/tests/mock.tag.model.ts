import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Tag, TagDocument } from '../schema/tag.schema';

const now = new Date();

export const MOCK_TAG_DOCUMENT = {
  _id: Types.ObjectId().toHexString(),
  owner: Types.ObjectId().toHexString(),
  label: 'test',
  createAt: now,
  updateAt: now,
} as TagDocument;

export const MOCK_TAG_VALUE = {
  create: jest
    .fn()
    .mockImplementation(() => Promise.resolve(MOCK_TAG_DOCUMENT)),
  findByIdAndUpdate: jest
    .fn()
    .mockImplementation(() => Promise.resolve(MOCK_TAG_DOCUMENT)),
  findById: jest
    .fn()
    .mockImplementation(() => Promise.resolve(MOCK_TAG_DOCUMENT)),
};

export const MOCK_TAG_MODEL: Provider = {
  provide: getModelToken(Tag.name),
  useValue: MOCK_TAG_VALUE,
};
