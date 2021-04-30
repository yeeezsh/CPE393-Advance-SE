import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { TagType } from '../../@types/tag-type.type';
import { Tag } from '../../schema/tag.schema';

registerEnumType(TagType, {
  name: String(TagType),
});

@InputType()
export class TagCreateInputDTO implements Omit<Tag, 'createAt' | 'updateAt'> {
  @Field()
  owner: string;

  @Field({ nullable: true })
  label: string;

  @Field(() => TagType)
  type: TagType;
}
