import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookmark, UrlDocument } from '../bookmark/schema/bookmark.schema';
import { Tag, TagDocument } from '../bookmark/schema/tag.schema';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<UrlDocument>,
    @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
  ) {}
}
