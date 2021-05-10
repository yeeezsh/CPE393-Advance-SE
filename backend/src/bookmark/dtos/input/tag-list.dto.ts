import { Field, ObjectType } from '@nestjs/graphql';
import { TagDTO } from '../tag.dto';

@ObjectType()
export class TagListDTO {
  @Field(() => [TagDTO], { defaultValue: [] })
  result: TagDTO[];
}
