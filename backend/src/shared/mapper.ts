import { UserDto } from 'src/users/user.dto';
import { UserEntity } from 'src/users/user.entity';

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, email } = data;
  let userDto: UserDto = {
    id,
    username,
    email,
  };
  return userDto;
};
