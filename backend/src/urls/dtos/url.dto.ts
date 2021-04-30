import { Field, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Tag } from '../schema/tag.schema';
import { Url } from '../schema/url.schema';

@ObjectType()
export class UrlDTO implements Url {
  @Field(() => String)
  owner: string;

  @Field(() => String)
  original: string;

  @Field(() => String)
  domain: string;

  @Field(() => String)
  note: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => Date, { nullable: true, defaultValue: Date.now })
  createAt: Date;

  @Field(() => Date, { nullable: true, defaultValue: Date.now })
  updateAt: Date;
}
