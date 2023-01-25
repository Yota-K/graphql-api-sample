import { InputType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @MaxLength(30)
  @Field()
  name: string;

  @MaxLength(255)
  @Field()
  email: string;
}
