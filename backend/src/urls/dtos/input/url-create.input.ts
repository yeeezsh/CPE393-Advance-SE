import { Field, InputType } from '@nestjs/graphql';
import { Url } from '../../schema/url.schema';

@InputType()
export class UrlCreateInputDTO
  implements Pick<Url, 'owner' | 'original' | 'note' | 'tags'> {
  @Field()
  owner: string;

  @Field()
  original: string;

  @Field()
  note: string;

  @Field(() => [String])
  tags: string[];
}
