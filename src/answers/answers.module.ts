import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { QuestionsModule } from 'src/questions/questions.module';
import { ProfileModule } from 'src/profile/profile.module';
import { AuthModule } from 'src/shared/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    QuestionsModule,
    AuthModule,
    ProfileModule,
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
  exports: [TypeOrmModule.forFeature([Answer]), AnswersService],
})
export class AnswersModule {}
