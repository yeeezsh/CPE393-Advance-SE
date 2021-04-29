import { Prop, Schema } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { User } from '../../account/schema/user.schema';

export type UrlDocument = Url & Document;

@Schema()
export class Url {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  owner: Types.ObjectId;

  @Prop({
    required: true,
  })
  original: string;

  @Prop({
    required: true,
  })
  doamin: string;

  @Prop({
    required: true,
  })
  subdomain: string;

  @Prop()
  note: string;

  @Prop({ required: true, default: Date.now })
  createAt: Date;

  @Prop({ required: true, default: Date.now })
  updateAt: Date;
}
