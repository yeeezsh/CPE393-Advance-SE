import { Prop, Schema } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { User } from '../../account/schema/user.schema';
import { TagType } from '../@types/tag-type.type';

export type TagDocument = Tag & Document;

@Schema()
export class Tag {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  owner: Types.ObjectId;

  @Prop({
    required: true,
    index: true,
    unique: true,
  })
  label: string;

  @Prop({
    index: true,
    enum: TagType,
    required: true,
  })
  type: TagType;

  @Prop({ required: true, default: Date.now })
  createAt: Date;

  @Prop({ required: true, default: Date.now })
  updateAt: Date;
}
