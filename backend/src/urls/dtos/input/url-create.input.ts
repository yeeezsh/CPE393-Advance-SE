import { Field, InputType } from '@nestjs/graphql';
import { Url } from '../../schema/url.schema';

@InputType()
export class UrlCreateInputDTO implements Omit<Url, 'createAt' | 'updateAt'> {
  @Field()
  owner: string;

  @Field()
  original: string;

  @Field()
  domain: string;

  @Field()
  note: string;

  @Field(() => [String])
  tags: string[];
}
