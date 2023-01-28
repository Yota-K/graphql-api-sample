import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@ObjectType()
@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  @Field(() => ID)
  id: number;

  @Column({ type: 'varchar', length: 30 })
  @Field()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  email: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @CreateDateColumn()
  @Field()
  updatedAt: Date;

  @OneToMany(() => Book, (book) => book.user)
  @Field(() => [Book], { nullable: true })
  books: Book[];
}
