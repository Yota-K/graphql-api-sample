import { InputType, Field, ID } from '@nestjs/graphql';
import { IsInt, MaxLength } from 'class-validator';

@InputType()
export class CreateBookInput {
  @MaxLength(30)
  @Field()
  title: string;

  @Field()
  price: number;

  @IsInt()
  @Field(() => ID)
  userId: number;
}
