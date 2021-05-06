import { Field } from '@nestjs/graphql';
import { SearchInputDTO } from './search.input';

export class SearchFilterTag implements SearchInputDTO {
  @Field()
  owner: string;

  @Field(() => [String])
  tags: string[];
}
