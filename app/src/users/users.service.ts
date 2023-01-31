import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(createUserInput);
    await this.userRepository.save(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['books'] });
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { id },
      relations: ['books'],
    });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.findOneOrFail({ where: { id } });

    if (user) {
      const { email, name } = updateUserInput;
      const updateUser = await this.userRepository.save({
        email,
        name,
      });

      return updateUser;
    }
  }

  async remove(id: number): Promise<User> {
    const user = this.userRepository.findOneOrFail({ where: { id } });

    if (user) {
      await this.userRepository.delete(id);
      return user;
    }
  }
}
