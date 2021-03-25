import { CreateUserDto } from './user.create.dto';
import { UserDto } from './user.dto';

export class UserService {

  async createUser(userDto: CreateUserDto): Promise<UserDto> {
    const { username, password, email } = userDto;
// wait for Repository
    return userDto;
  }
}
