import { UserDto } from '../users/user.dto';
import { UserEntity } from '../users/user.entity';

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, email } = data;
  const userDto: UserDto = {
    id,
    username,
    email,
  };
  return userDto;
};
