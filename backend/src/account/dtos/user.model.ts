import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../schema/user.schema';

@ObjectType()
export class UserModel implements User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  displayName: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;

  @Field(() => Date, { nullable: true, defaultValue: Date.now })
  createAt: Date;

  @Field(() => Boolean, { nullable: true, defaultValue: undefined })
  deactivate?: boolean | undefined;
}
