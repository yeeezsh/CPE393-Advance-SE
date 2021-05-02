import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookmarkDTO } from './dtos/bookmark.dto';
import { BookmarkCreateInputDTO } from './dtos/input/bookmark-create.input';
import { BookmarkEditInputDTO } from './dtos/input/bookmark-edit.input.dto';
import { UrlBadIdException } from './exceptions/url-bad-id.exceptions';
import { Bookmark, UrlDocument } from './schema/bookmark.schema';
import urlParse from './utils/url.parse';

const MAX_QUERY = 100;

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel(Bookmark.name) private urlModel: Model<UrlDocument>,
  ) {}

  async getRecentUrl(
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

  async addUrl(create: BookmarkCreateInputDTO): Promise<BookmarkDTO> {
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

  async editUrl(update: BookmarkEditInputDTO): Promise<BookmarkDTO> {
    const now = new Date();
    const { original, domain } = urlParse(update.original);
    const updated = await this.urlModel.findByIdAndUpdate(
      update._id,
      {
        ...update,
        domain: domain ?? '',
        original,
        updateAt: now,
      },
      { new: true },
    );

    if (!updated) throw new UrlBadIdException();
    return updated as BookmarkDTO;
  }
}
