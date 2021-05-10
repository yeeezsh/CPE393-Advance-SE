import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookmark, BookmarkDocument } from '../bookmark/schema/bookmark.schema';
import { Tag, TagDocument } from '../bookmark/schema/tag.schema';
import { SearchFilterTag } from './dtos/input/search-filter-tag.input';
import { SearchInputDTO } from './dtos/input/search.input';
import { SearchDTO } from './dtos/search.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<BookmarkDocument>,
    @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
  ) {}

  async allTextSearch(search: SearchInputDTO): Promise<SearchDTO> {
    const results = await this.bookmarkModel.aggregate([
      {
        $match: {
          // select from owner only
          // owner: Types.ObjectId(search.owner) || search.owner,
          // FIXME: change on prod
          owner: search.owner,
        },
      },
      {
        $addFields: {
          unwindTags: '$tags',
        },
      },
      {
        $unwind: {
          path: '$tags',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        // join
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags',
        },
      },
      {
        // partial text search, all fields
        // expensive ops
        $match: {
          $or: [
            { note: { $regex: `${search.text}`, $options: 'i' } },
            { tags: { $regex: `${search.text}`, $options: 'i' } },
            {
              domain: { $regex: `${search.text}`, $options: 'i' },
            },
            { original: { $regex: `${search.text}`, $options: 'i' } },
          ],
        },
      },
    ]);

    return { results };
  }

  async filterByTag(search: SearchFilterTag): Promise<SearchDTO> {
    // FIXME: change on prod

    const tags = search.tags;
    const results = await this.bookmarkModel.aggregate([
      {
        $match: {
          owner: search.owner,
          tags: {
            $in: tags,
          },
        },
      },
      {
        $addFields: {
          unwindTags: '$tags',
        },
      },
    ]);

    return {
      results,
    };
  }
}
