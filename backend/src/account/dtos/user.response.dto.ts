import { Field, ObjectType } from '@nestjs/graphql';
import { UserDTO } from './user.dto';

@ObjectType()
export class UserResponseDTO implements Partial<UserDTO> {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  displayName: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => Date, { nullable: true, defaultValue: Date.now })
  createAt: Date;

  @Field(() => Boolean, { nullable: true, defaultValue: undefined })
  deactivate?: boolean | undefined;
}
