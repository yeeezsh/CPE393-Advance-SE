import { Field, InputType } from '@nestjs/graphql';
import { SearchInputDTO } from './search.input';

@InputType()
export class SearchTextInputDTO implements SearchInputDTO {
  @Field()
  owner: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => String, { nullable: true })
  text?: string;
}
