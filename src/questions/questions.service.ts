import { Injectable } from '@nestjs/common';

// TypeORM Imports
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Question Objects
import { Question } from './entities/question.entity';

// DTO Imports
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class QuestionsService {
  @InjectRepository(Question)
  private readonly repository: Repository<Question>;

  findAll() {
    return this.repository.find({
      relations: ['answers', 'answers.profile', 'profile'],
      order: {
        createdAt: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['answers', 'profile'],
    });
  }

  create(
    createQuestionDto: CreateQuestionDto,
    user: Profile,
  ): Promise<Question> {
    const question: Question = new Question();
    question.title = createQuestionDto.title;
    question.question = createQuestionDto.question;
    question.profile = user;

    return this.repository.save(question);
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
    profile: number,
  ): Promise<Question | any> {
    const question_DBObject = await this.repository.findOne({
      where: { id, profile: { id: profile } },
      relations: ['profile'],
    });
    if (question_DBObject) {
      question_DBObject.title = updateQuestionDto.title;
      question_DBObject.question = updateQuestionDto.question;
      return this.repository.save(question_DBObject);
    }
    return {
      Error: 'Question id not found',
    };
  }

  remove(id: number, profile: number) {
    return this.repository.delete({ id, profile: { id: profile } });
  }

  uploadImage(file: Express.Multer.File) {
    return file;
  }
}
