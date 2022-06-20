import { Injectable } from '@nestjs/common';

// TypeORM Imports
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Objects
import { Profile } from './entities/profile.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProfileService {
  @InjectRepository(Profile)
  private readonly repository: Repository<Profile>;

  async create(userObject: User, name: string) {
    const user: Profile = new Profile();
    user.user = userObject;
    user.name = name;

    return await this.repository.save(user);
  }

  findById(id: number) {
    return this.repository.findOne({
      where: { id },
    });
  }

  remove(id: number) {
    return this.repository.delete(id);
  }

  /*
  async addQuestion(id: number, question: Question) {
    const profile = await this.repository.findOne({
      where: { id },
    });
    profile.questions.push(question);
    return this.repository.save(profile);
  }

  async addAnswer(id: number, answer: Answer) {
    const profile = await this.repository.findOne({
      where: { id },
    });
    profile.answers.push(answer);
    return this.repository.save(profile);
  }
  */
}
