import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TagDeleteInputDTO {
  @Field()
  bookmarkId: string;
}
