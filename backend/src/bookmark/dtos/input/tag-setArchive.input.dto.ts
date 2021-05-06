import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { TagType } from '../../@types/tag-type.type';

@InputType()
export class TagSetArchiveInputDTO {
  @Field()
  bookmarkId: string;
}
