import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../account/schema/user.schema';
import { Tag } from './tag.schema';

export type BookmarkDocument = Bookmark & Document;

@Schema()
export class Bookmark {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  owner: string;

  @Prop({
    required: true,
  })
  original: string;

  @Prop({
    required: true,
  })
  domain: string;

  @Prop()
  note: string;

  @Prop({
    type: Array,
    refs: Tag.name,
    index: true,
    default: [],
  })
  tags: string[];

  @Prop({ required: true, default: Date.now })
  createAt: Date;

  @Prop({ required: true, default: Date.now })
  updateAt: Date;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
