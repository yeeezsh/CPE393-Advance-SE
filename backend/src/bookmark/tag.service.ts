import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemTagType } from './@types/systemTag-type.type';
import { BookmarkService } from './bookmark.service';
import { BookmarkDTO } from './dtos/bookmark.dto';
import { BookmarkEditInputDTO } from './dtos/input/bookmark-edit.input.dto';
import { BookmarkGetInputDTO } from './dtos/input/bookmark-get.input.dto';
import { TagAddToBookmarkDTO } from './dtos/input/tag-addToBookmark.input.dto';
import { TagCreateInputDTO } from './dtos/input/tag-create.input.dto';
import { TagEditInputDTO } from './dtos/input/tag-edit.input.dto';
import { TagListDTO } from './dtos/input/tag-list.dto';
import { TagDTO } from './dtos/tag.dto';
import { BookmarkBadIdException } from './exceptions/bookmark-bad-id.exceptions';
import { TagBadIdException } from './exceptions/tag-bad-id.exceptions';
import { Bookmark, BookmarkDocument } from './schema/bookmark.schema';
import { Tag, TagDocument } from './schema/tag.schema';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
    private bookmarkService: BookmarkService,
    @InjectModel(Bookmark.name) private bookmarkModel: Model<BookmarkDocument>,
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

    return this.bookmarkService.editBookmark(toUpdateBookmark);
  }

  async editTag(update: TagEditInputDTO): Promise<TagDTO> {
    const now = new Date();
    const updated = await this.tagModel.findByIdAndUpdate(
      update._id,
      {
        ...update,
        updateAt: now,
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

    return this.bookmarkService.editBookmark(toUpdate);
  }

  async restoreFromTrash(id: string) {
    const bookmark = (await this.bookmarkModel.findById(
      id,
    )) as BookmarkDocument;
    if (!bookmark) throw new BookmarkBadIdException();
    bookmark.tags = [...bookmark.tags.filter((el) => el !== 'delete')];
    await bookmark.save();
    return 'restored';
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

    return this.bookmarkService.editBookmark(toUpdate);
  }

  async listAllTag(owner: string): Promise<TagListDTO> {
    const result = await this.tagModel.find({ owner });
    return { result } as TagListDTO;
  }
}
