import { InputType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateBookInput {
  @MaxLength(30)
  @Field()
  title: string;

  @MaxLength(255)
  @Field()
  author: string;

  @Field()
  price: number;
}
