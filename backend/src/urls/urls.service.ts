import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from '../account/dtos/user.dto';
import { UrlDTO } from './dtos/url.dto';
import { Tag, TagDocument } from './schema/tag.schema';
import { Url, UrlDocument } from './schema/url.schema';

@Injectable()
export class UrlsService {
  constructor(
    @InjectModel(Url.name) private urlModel: Model<UrlDocument>,
    @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
  ) {}

  async addUrl(owner: UserDTO['_id'], url: UrlDTO): Promise<UrlDocument> {
    const now = new Date();
    const doc = await this.urlModel.create({
      ...url,
      owner,
      createAt: now,
      updateAt: now,
    });
    return doc;
  }
}
