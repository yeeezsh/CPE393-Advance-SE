import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookmarkDTO } from './dtos/bookmark.dto';
import { BookmarkGetInputDTO } from './dtos/input/bookmark-get.input.dto';
import { TagAddToBookmarkDTO } from './dtos/input/tag-addToBookmark.input.dto';
import { TagCreateInputDTO } from './dtos/input/tag-create.input.dto';
import { TagEditInputDTO } from './dtos/input/tag-edit.input.dto';
import { TagListDTO } from './dtos/input/tag-list.dto';
import { TagDTO } from './dtos/tag.dto';
import { TagService } from './tag.service';

@Resolver(() => TagDTO)
export class TagsResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => TagDTO)
  async createTag(
    @Args('TagCreateInputDTO') tagCreateInputDTO: TagCreateInputDTO,
  ): Promise<TagDTO> {
    return this.tagService.createTag(tagCreateInputDTO);
  }

  @Mutation(() => BookmarkDTO)
  async addTagToBookmark(
    @Args('TagAddToBookmarkDTO') tagAddBookmarkDTO: TagAddToBookmarkDTO,
  ): Promise<BookmarkDTO> {
    return this.tagService.addTagToBookmark(tagAddBookmarkDTO);
  }

  @Mutation(() => TagDTO)
  async editTag(
    @Args('TagEditInputDTO') tagEditInputDTO: TagEditInputDTO,
  ): Promise<TagDTO> {
    return this.tagService.editTag(tagEditInputDTO);
  }

  @Mutation(() => BookmarkDTO)
  async deleteTag(
    @Args('BookmarkGetInputDTO') tagDeleteInputDTO: BookmarkGetInputDTO,
  ): Promise<BookmarkDTO> {
    return this.tagService.deleteTag(tagDeleteInputDTO);
  }

  @Mutation(() => BookmarkDTO)
  async setArchiveTag(
    @Args('BookmarkGetInputDTO') tagSetArchiveInputDTO: BookmarkGetInputDTO,
  ): Promise<BookmarkDTO> {
    return this.tagService.setArchiveTag(tagSetArchiveInputDTO);
  }

  @Query(() => TagListDTO)
  async listAllTag(@Args('owner') owner: string): Promise<TagListDTO> {
    return this.tagService.listAllTag(owner);
  }

  @Mutation(() => String)
  async restoreFromTrash(@Args('bookmarkId') bookmark: string) {
    return this.tagService.restoreFromTrash(bookmark);
  }
}
