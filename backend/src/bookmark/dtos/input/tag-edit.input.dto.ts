import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Tag } from '../../schema/tag.schema';

@InputType()
export class TagEditInputDTO
  implements Omit<Tag, 'createAt' | 'updateAt' | 'owner'> {
  @Field()
  _id: string;

  @Field({ nullable: true })
  label: string;
}
