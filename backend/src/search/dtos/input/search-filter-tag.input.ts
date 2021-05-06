import { Field, InputType } from '@nestjs/graphql';
import { SearchInputDTO } from './search.input';

@InputType()
export class SearchFilterTag implements SearchInputDTO {
  @Field()
  owner: string;

  @Field(() => [String])
  tags: string[];
}
