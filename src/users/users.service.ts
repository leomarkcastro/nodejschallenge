import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async findOne(email: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: { email },
    });
  }

  async create(email: string, password: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.password_hash = await hash(password, 10);
    return this.repository.save(user);
  }
}
