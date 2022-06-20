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

    const data = await this.answersService.create(
      createAnswerDto,
      questionObject,
      userObject,
    );
    return { data };
  }

  @Get()
  async findAll() {
    const data = await this.answersService.findAll();
    return { data, total: data.length };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.answersService.findOne(+id);
    return { data };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
    @Req() req,
  ) {
    const data = await this.answersService.update(
      +id,
      updateAnswerDto,
      req.user.userId,
    );
    return { data };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const data = await this.answersService.remove(+id, +req.user.userId);
    return { data };
  }
}
