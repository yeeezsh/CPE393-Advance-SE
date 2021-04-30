import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { TagType } from '../@types/tag-type.type';
import { Tag, TagDocument } from '../schema/tag.schema';

const now = new Date();

export const MOCK_TAG_DOCUMENT = {
  _id: Types.ObjectId().toHexString(),
  owner: Types.ObjectId().toHexString(),
  label: 'test',
  type: TagType.tag,
  createAt: now,
  updateAt: now,
} as TagDocument;

export const MOCK_TAG_VALUE = {};

export const MOCK_TAG_MODEL: Provider = {
  provide: getModelToken(Tag.name),
  useValue: MOCK_TAG_VALUE,
};