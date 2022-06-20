import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Res,
  StreamableFile,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadDto } from './dto/upload.dto';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ProfileService } from 'src/profile/profile.service';
import { JwtAuthGuard } from 'src/shared/auth/jwt-auth.guard';

@Controller('api/questions')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly profilesService: ProfileService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto, @Req() req) {
    const userObject = await this.profilesService.findById(+req.user.userId);
    if (!userObject) {
      return {
        error: 'User not found',
      };
    }
    const data = this.questionsService.create(createQuestionDto, userObject);
    return { data };
  }

  @Get()
  async findAll() {
    const data = await this.questionsService.findAll();
    return { data, total: data.length };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.questionsService.findOne(+id);
    return { data };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Req() req,
  ) {
    const data = await this.questionsService.update(
      +id,
      updateQuestionDto,
      +req.user.userId,
    );
    return {
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const data = await this.questionsService.remove(+id, +req.user.userId);
    return { data };
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './public/upload',
        filename(req, file, callback) {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  uploadImage(
    @Body() body: UploadDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(body);
    console.log(files);
  }

  @Get('download/:fileName')
  getFile(@Param('fileName') fileName: string): StreamableFile {
    const fileLocation = join(__dirname, '../../public/upload', fileName);
    const file = createReadStream(fileLocation);
    return new StreamableFile(file);
  }
}
