import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TagCreateInputDTO } from './dtos/input/tag-create.input.dto';
import { TagEditInputDTO } from './dtos/input/tag-edit.input.dto';
import { TagDTO } from './dtos/tag.dto';
import { TagService } from './tag.service';

@Resolver(() => TagDTO)
export class TagsResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => TagDTO)
  async addTag(
    @Args('TagCreateInputDTO') tagCreateInputDTO: TagCreateInputDTO,
  ): Promise<TagDTO> {
    return this.tagService.addTag(tagCreateInputDTO);
  }

  @Mutation(() => TagDTO)
  async editTag(
    @Args('TagEditInputDTO') tagEditInputDTO: TagEditInputDTO,
  ): Promise<TagDTO> {
    return this.tagService.editTag(tagEditInputDTO);
  }
}
