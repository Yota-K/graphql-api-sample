import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async create(createBookInput: CreateBookInput): Promise<Book> {
    const book = this.bookRepository.create(createBookInput);
    await this.bookRepository.save(book);
    return book;
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Book> {
    return this.bookRepository.findOneOrFail({
      relations: ['user'],
      where: { userId: id },
    });
  }

  async update(id: number, updateBookInput: UpdateBookInput): Promise<Book> {
    const book = this.bookRepository.findOneOrFail({ where: { id } });

    if (book) {
      return this.bookRepository.save(updateBookInput);
    }
  }

  async remove(id: number): Promise<Book> {
    const book = this.bookRepository.findOneOrFail({ where: { id } });

    if (book) {
      await this.bookRepository.delete(id);
      return book;
    }
  }
}
