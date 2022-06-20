import { Injectable } from '@nestjs/common';

// TypeORM Imports
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Answer Objects
import { Answer } from './entities/answer.entity';

// DTO Imports
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

// Question Objects (for relation)
import { Question } from 'src/questions/entities/question.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class AnswersService {
  @InjectRepository(Answer)
  private readonly repository: Repository<Answer>;

  findAll() {
    return this.repository.find({
      relations: {
        profile: true,
      },
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['answers', 'profile', 'profile.user'],
    });
  }

  async create(
    createAnswerDto: CreateAnswerDto,
    questionObject: Question,
    profile: Profile,
  ): Promise<Answer> {
    const answer: Answer = new Answer();
    answer.question = questionObject;
    answer.answer = createAnswerDto.answer;
    answer.profile = profile;

    return await this.repository.save(answer);
  }

  async update(
    id: number,
    updateAnswerDto: UpdateAnswerDto,
    profile: number,
  ): Promise<Answer | any> {
    const answer_DBObject = await this.repository.findOne({
      where: { id, profile: { id: profile } },
      relations: ['profile'],
    });
    if (answer_DBObject) {
      answer_DBObject.answer = updateAnswerDto.answer;
      return this.repository.save(answer_DBObject);
    }
    return {
      Error: 'Question id not found',
    };
  }

  async remove(id: number, profile: number) {
    return this.repository.delete({
      id,
      profile: { id: profile },
    });
  }
}
