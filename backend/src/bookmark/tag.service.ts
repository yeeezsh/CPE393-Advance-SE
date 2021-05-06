import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemTagType } from './@types/systemTag-type.type';
import { TagType } from './@types/tag-type.type';
import { BookmarkService } from './bookmark.service';
import { BookmarkDTO } from './dtos/bookmark.dto';
import { BookmarkEditInputDTO } from './dtos/input/bookmark-edit.input.dto';
import { BookmarkGetInputDTO } from './dtos/input/bookmark-get.input.dto';
import { TagAddToBookmarkDTO } from './dtos/input/tag-addToBookmark.input.dto';
import { TagCreateInputDTO } from './dtos/input/tag-create.input.dto';
import { TagEditInputDTO } from './dtos/input/tag-edit.input.dto';
import { TagDTO } from './dtos/tag.dto';
import { TagBadIdException } from './exceptions/tag-bad-id.exceptions';
import { Tag, TagDocument } from './schema/tag.schema';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
    private bookmarkService: BookmarkService,
  ) {}

  async createTag(create: TagCreateInputDTO): Promise<TagDTO> {
    const now = new Date();
    const doc = await this.tagModel.create({
      ...create,
      createAt: now,
      updateAt: now,
    });
    return doc as TagDTO;
  }

  async addTagToBookmark(tagToAdd: TagAddToBookmarkDTO): Promise<BookmarkDTO> {
    const bookmark = await this.bookmarkService.getABookmark(
      tagToAdd.bookmarkId,
    );
    const tag = await this.tagModel.findById(tagToAdd._id);
    if (!tag) throw new TagBadIdException();
    const merge = [...bookmark.tags, tag._id];
    const distinct = [...new Set(merge)];

    const toUpdateBookmark = {
      _id: bookmark._id,
      original: bookmark.original,
      note: bookmark.note,
      tags: distinct,
    } as BookmarkEditInputDTO;

    const updatedBookmark = await this.bookmarkService.editBookmark(
      toUpdateBookmark,
    );
    return updatedBookmark;
  }

  async editTag(update: TagEditInputDTO): Promise<TagDTO> {
    const now = new Date();
    const updated = await this.tagModel.findByIdAndUpdate(
      update._id,
      {
        ...update,
        updateAt: now,
        type: TagType.user,
      },
      { new: true },
    );

    return updated as TagDTO;
  }

  async deleteTag(deleteInput: BookmarkGetInputDTO): Promise<BookmarkDTO> {
    const bookmark = await this.bookmarkService.getABookmark(
      deleteInput.bookmarkId,
    );
    const merge = [...bookmark.tags, SystemTagType.delete];
    const distinct = [...new Set(merge)];

    const toUpdate = {
      _id: bookmark._id,
      original: bookmark.original,
      note: bookmark.note,
      tags: distinct,
    } as BookmarkEditInputDTO;

    const returnBookMark = await this.bookmarkService.editBookmark(toUpdate);
    return returnBookMark;
  }

  async setArchiveTag(archive: BookmarkGetInputDTO): Promise<BookmarkDTO> {
    const bookmark = await this.bookmarkService.getABookmark(
      archive.bookmarkId,
    );

    const merge = [...bookmark.tags, SystemTagType.archive];
    const distinct = [...new Set(merge)];

    const toUpdate = {
      _id: bookmark._id,
      original: bookmark.original,
      note: bookmark.note,
      tags: distinct,
    } as BookmarkEditInputDTO;

    const editedBookmark = await this.bookmarkService.editBookmark(toUpdate);
    return editedBookmark;
  }
}
