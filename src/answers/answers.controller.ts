import { QuestionsService } from './../questions/questions.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ProfileService } from 'src/profile/profile.service';
import { JwtAuthGuard } from 'src/shared/auth/jwt-auth.guard';

@Controller('api/answers')
export class AnswersController {
  constructor(
    private readonly answersService: AnswersService,
    private readonly questionsService: QuestionsService,
    private readonly profilesService: ProfileService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createAnswerDto: CreateAnswerDto, @Req() req) {
    const questionObject = await this.questionsService.findOne(
      +createAnswerDto.question,
    );
    if (!questionObject) {
      return {
        error: 'Question not found',
      };
    }

    const userObject = await this.profilesService.findById(+req.user.userId);
    if (!userObject) {
      return {
        error: 'User not found',
      };
    }

    return this.answersService.create(
      createAnswerDto,
      questionObject,
      userObject,
    );
  }

  @Get()
  findAll() {
    return this.answersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
    @Req() req,
  ) {
    return this.answersService.update(+id, updateAnswerDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    return this.answersService.remove(+id, +req.user.userId);
  }
}
