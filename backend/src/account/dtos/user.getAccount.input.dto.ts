import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserGetAccountInputDTO {
  @Field(() => String)
  _id: string;
}
