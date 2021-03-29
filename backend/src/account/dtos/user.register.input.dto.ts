import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Max, Min } from 'class-validator';
import { User } from '../schema/user.schema';

@InputType()
export class UserRegisterInputDTO implements Omit<User, 'createAt'> {
  @Field()
  @IsString()
  displayName: string;

  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  @Min(6)
  @Max(40)
  password: string;

  @Field()
  @IsEmail()
  email: string;
}
