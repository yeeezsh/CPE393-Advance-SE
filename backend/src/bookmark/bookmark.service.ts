import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookmarkDTO } from './dtos/bookmark.dto';
import { BookmarkCreateInputDTO } from './dtos/input/bookmark-create.input';
import { BookmarkEditInputDTO } from './dtos/input/bookmark-edit.input.dto';
import { BookmarkBadIdException } from './exceptions/bookmark-bad-id.exceptions';
import { Bookmark, BookmarkDocument } from './schema/bookmark.schema';
import urlParse from './utils/url.parse';

const MAX_QUERY = 100;

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel(Bookmark.name) private urlModel: Model<BookmarkDocument>,
  ) {}

  async getRecentBookmark(
    owner: string,
    skip = 0,
    limit = MAX_QUERY,
  ): Promise<BookmarkDTO[]> {
    const doc = await this.urlModel
      .find({ owner })
      .sort({ updateAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    return doc as BookmarkDTO[];
  }

  async getABookmark(bookmarkId: string): Promise<BookmarkDTO> {
    const doc = await this.urlModel.findById(bookmarkId);
    if (!doc) throw new BookmarkBadIdException();

    return doc as BookmarkDTO;
  }

  async addBookmark(create: BookmarkCreateInputDTO): Promise<BookmarkDTO> {
    const now = new Date();
    const { original, domain } = urlParse(create.original);
    const doc = await this.urlModel.create({
      ...create,
      original,
      domain,
      createAt: now,
      updateAt: now,
    });
    return doc as BookmarkDTO;
  }

  async editBookmark(update: BookmarkEditInputDTO): Promise<BookmarkDTO> {
    const now = new Date();
    const bookmark = await this.urlModel.findById(update._id);
    if (!bookmark) throw new BookmarkBadIdException();

    const parse = update.original && urlParse(update.original);
    bookmark.domain = (parse && parse?.domain) || bookmark.domain;
    bookmark.original = update.original || bookmark.original;
    bookmark.tags = update.tags || bookmark.tags;
    bookmark.note = update.note || bookmark.note;
    bookmark.updateAt = now;

    const saved = await bookmark.save();
    return saved as BookmarkDTO;
  }
}
