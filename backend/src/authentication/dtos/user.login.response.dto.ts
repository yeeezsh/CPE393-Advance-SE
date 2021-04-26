import { Field, ObjectType } from '@nestjs/graphql';
import { UserDTO } from '../../account/dtos/user.dto';

@ObjectType()
export class UserLoginResponseDTO implements Partial<UserDTO> {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  displayName: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  token?: string;
}
