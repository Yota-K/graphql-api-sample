import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

export const pubsub = new PubSub();

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    const newBook = this.booksService.create(createBookInput);
    // 本の情報がDBに登録された時にSubscriptionを使用してクライアントサイドで変更を検知できるようにしている
    pubsub.publish('bookAdded', { bookAdded: newBook });
    return newBook;
  }

  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.booksService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id', { type: () => ID }) id: number) {
    return this.booksService.findOne(id);
  }

  @Mutation(() => Book)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.booksService.update(updateBookInput.id, updateBookInput);
  }

  @Mutation(() => Book)
  removeBook(@Args('id', { type: () => ID }) id: number) {
    return this.booksService.remove(id);
  }

  @Subscription((returns) => Book)
  bookAdded() {
    return pubsub.asyncIterator('bookAdded');
  }
}
