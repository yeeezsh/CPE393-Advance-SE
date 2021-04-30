import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UrlCreateInputDTO } from './dtos/input/url-create.input';
import { UrlEditInputDTO } from './dtos/input/url-edit.input.dto';
import { UrlDTO } from './dtos/url.dto';
import { UrlBadIdException } from './exceptions/url-bad-id.exceptions';
import { Url, UrlDocument } from './schema/url.schema';
import urlParse from './utils/url.parse';

@Injectable()
export class UrlsService {
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {}

  async addUrl(create: UrlCreateInputDTO): Promise<UrlDTO> {
    const now = new Date();
    const { original, domain } = urlParse(create.original);
    const doc = await this.urlModel.create({
      ...create,
      original,
      domain,
      createAt: now,
      updateAt: now,
    });
    return doc as UrlDTO;
  }

  async editUrl(update: UrlEditInputDTO): Promise<UrlDTO> {
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
    return updated as UrlDTO;
  }
}
