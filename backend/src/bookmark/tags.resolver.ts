import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BookmarkDTO } from './dtos/bookmark.dto';
import { TagCreateInputDTO } from './dtos/input/tag-create.input.dto';
import { TagDeleteInputDTO } from './dtos/input/tag-delete.input.dto';
import { TagEditInputDTO } from './dtos/input/tag-edit.input.dto';
import { TagSetArchiveInputDTO } from './dtos/input/tag-setArchive.input.dto';
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

  @Mutation(() => TagDTO)
  async deleteTag(
    @Args('TagDeleteInputDTO') tagDeleteInputDTO: TagDeleteInputDTO,
  ): Promise<BookmarkDTO> {
    return this.tagService.deleteTag(tagDeleteInputDTO);
  }

  @Mutation(() => TagDTO)
  async setArchiveTag(
    @Args('TagSetArchiveDTO') tagSetArchiveInputDTO: TagSetArchiveInputDTO,
  ): Promise<BookmarkDTO> {
    return this.tagService.setArchiveTag(tagSetArchiveInputDTO);
  }
}
