import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('books')
export class Book {
  @PrimaryGeneratedColumn({ unsigned: true })
  @Field(() => ID)
  id: number;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  author: string;

  @Column({ type: 'int', unsigned: true })
  price: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @CreateDateColumn()
  @Field()
  updatedAt: Date;
}
