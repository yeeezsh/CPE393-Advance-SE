import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UrlDTO } from './dtos/url.dto';
import { UrlBadIdException } from './exceptions/url-bad-id.exceptions';
import { Tag, TagDocument } from './schema/tag.schema';
import { Url, UrlDocument } from './schema/url.schema';

@Injectable()
export class UrlsService {
  constructor(
    @InjectModel(Url.name) private urlModel: Model<UrlDocument>,
    @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
  ) {}

  async addUrl(url: UrlDTO): Promise<UrlDocument> {
    const now = new Date();
    const doc = await this.urlModel.create({
      ...url,
      createAt: now,
      updateAt: now,
    });
    return doc;
  }

  async editUrl(id: Types.ObjectId, update: UrlDTO): Promise<UrlDocument> {
    const updated = await this.urlModel.findByIdAndUpdate(id, update);
    if (!updated) throw new UrlBadIdException();
    return updated;
  }
}
