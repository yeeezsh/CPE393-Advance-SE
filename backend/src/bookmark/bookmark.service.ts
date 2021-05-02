import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UrlCreateInputDTO } from './dtos/input/url-create.input';
import { UrlEditInputDTO } from './dtos/input/url-edit.input.dto';
import { BookmarkDTO } from './dtos/bookmark.dto';
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

  async addUrl(create: UrlCreateInputDTO): Promise<BookmarkDTO> {
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

  async editUrl(update: UrlEditInputDTO): Promise<BookmarkDTO> {
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
