import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookmark, BookmarkDocument } from '../bookmark/schema/bookmark.schema';
import { Tag, TagDocument } from '../bookmark/schema/tag.schema';
import { SearchInputDTO } from './dtos/input/search.input';
import { SearchDTO } from './dtos/search.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<BookmarkDocument>,
    @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
  ) {}

  async allTextSearch(search: SearchInputDTO): Promise<SearchDTO> {
    return { results: [] };
  }
}
