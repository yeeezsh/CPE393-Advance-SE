import { toUserDto } from 'src/shared/mapper';
import { CreateUserDto } from './user.create.dto';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';

export class UserService {
  constructor() {}

  async createUser(userDto: CreateUserDto): Promise<UserDto> {
    const { username, password, email } = userDto;
// wait for Repository
    return userDto;
  }
}
