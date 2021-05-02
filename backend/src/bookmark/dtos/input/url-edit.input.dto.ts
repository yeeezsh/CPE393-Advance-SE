import { Field, InputType } from '@nestjs/graphql';
import { UrlCreateInputDTO } from './url-create.input';

@InputType()
export class UrlEditInputDTO implements UrlCreateInputDTO {
  @Field()
  _id: string;

  @Field()
  owner: string;

  @Field(() => String, { nullable: true })
  original: string;

  @Field(() => String, { nullable: true })
  note: string;

  @Field(() => [String], { nullable: true })
  tags: string[];
}
