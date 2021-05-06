import { UserDTO } from '../../../account/dtos/user.dto';
import { Tag } from '../../../bookmark/schema/tag.schema';

export class SearchInputDTO {
  owner: UserDTO['_id'];
  tags?: Tag['label'][];
  text?: string;
}
