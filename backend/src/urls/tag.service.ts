import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TagType } from './@types/tag-type.type';
import { TagCreateInputDTO } from './dtos/input/tag-create.input.dto';
import { TagEditInputDTO } from './dtos/input/tag-edit.input.dto';
import { TagDTO } from './dtos/tag.dto';
import { Tag, TagDocument } from './schema/tag.schema';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) {}

  async addTag(create: TagCreateInputDTO): Promise<TagDTO> {
    const now = new Date();
    const doc = await this.tagModel.create({
      ...create,
      createAt: now,
      updateAt: now,
    });
    return doc as TagDTO;
  }

  async editTag(update: TagEditInputDTO): Promise<TagDTO> {
    const now = new Date();
    const updated = await this.tagModel.findByIdAndUpdate(
      update._id,
      {
        ...update,
        updateAt: now,
        type: TagType.tag,
      },
      { new: true },
    );

    return updated as TagDTO;
  }
}
