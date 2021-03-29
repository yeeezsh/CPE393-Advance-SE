import { Field, InputType } from '@nestjs/graphql';
import { User } from '../schema/user.schema';

@InputType()
export class UserRegisterInputDTO implements Omit<User, 'createAt'> {
  @Field()
  displayName: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  email: string;
}
