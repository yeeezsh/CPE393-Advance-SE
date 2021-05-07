import { Field, InputType } from '@nestjs/graphql';
import { Tag } from '../../schema/tag.schema';



@InputType()
export class TagCreateInputDTO implements Omit<Tag, 'createAt' | 'updateAt'> {
  @Field()
  owner: string;

  @Field()
  label: string;
}
