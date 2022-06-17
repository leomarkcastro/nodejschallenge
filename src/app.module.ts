import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [QuestionModule],
})
export class AppModule {}
