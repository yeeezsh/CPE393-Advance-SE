import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
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
  @MinLength(6)
  @MaxLength(40)
  password: string;

  @Field()
  @IsEmail()
  email: string;
}
