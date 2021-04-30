import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TagDTO } from './dtos/tag.dto';

@Resolver(() => TagDTO)
export class TagsResolver {
  @Mutation(() => TagDTO)
  async addTag(
    @Args('')
  ):Promise<TagDTO {
    return;
  }
}
