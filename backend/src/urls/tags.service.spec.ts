import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { TagType } from './@types/tag-type.type';
import { TagCreateInputDTO } from './dtos/input/tag-create.input.dto';
import { TagEditInputDTO } from './dtos/input/tag-edit.input.dto';
import { TagService } from './tag.service';
import { MOCK_TAG_MODEL, MOCK_TAG_VALUE } from './tests/mock.tag.model';
import { MOCK_URL_MODEL } from './tests/mock.url.model';

describe('TagsService', () => {
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MOCK_URL_MODEL, MOCK_TAG_MODEL, TagService],
    }).compile();

    service = module.get<TagService>(TagService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should able to call create when using addUrl', async () => {
    const MOCK_URL_INPUT = {
      owner: Types.ObjectId().toHexString(),
      label: 'test lable',
      type: TagType.tag,
    } as TagCreateInputDTO;

    await service.addTag(MOCK_URL_INPUT);
    const model = jest.spyOn(MOCK_TAG_VALUE, 'create');
    expect(model).toBeCalled();
  });

  it('Should able to call findByIdAndUpdate when using editUrl', async () => {
    const MOCK_URL_INPUT = {
      owner: Types.ObjectId().toHexString(),
      label: 'test lable',
      type: TagType.tag,
    } as TagEditInputDTO;

    await service.editTag(MOCK_URL_INPUT);
    const model = jest.spyOn(MOCK_TAG_VALUE, 'findByIdAndUpdate');
    expect(model).toBeCalled();
  });
});
