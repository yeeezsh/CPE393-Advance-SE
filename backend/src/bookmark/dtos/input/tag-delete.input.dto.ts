import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TagDeleteInputDTO {
  @Field()
  _id: string;
}
