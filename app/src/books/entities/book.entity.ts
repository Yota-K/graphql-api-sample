import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity('books')
export class Book {
  @PrimaryGeneratedColumn({ unsigned: true })
  @Field(() => ID)
  id: number;

  @Column({ type: 'varchar', length: 30 })
  @Field()
  title: string;

  @Column({ unsigned: true })
  @Field(() => ID)
  userId: number;

  @Column({ type: 'int', unsigned: true })
  @Field()
  price: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @CreateDateColumn()
  @Field()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.books)
  @Field(() => User, { nullable: true })
  user: User;
}
