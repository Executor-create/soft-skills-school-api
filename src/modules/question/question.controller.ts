import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { Question } from 'src/types/question.type';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/question.dto';
import { findByIdDto } from 'src/common/dto/findById.dto';
import { deleteByIdDto } from 'src/common/dto/deleteById.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @HttpCode(201)
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const question = await this.questionService.create(createQuestionDto);

    return question;
  }

  @Get(':id')
  @HttpCode(200)
  async getQuestion(@Param() id: findByIdDto): Promise<Question> {
    const fetchedQuestion = await this.questionService.get(id);

    return fetchedQuestion;
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteQuestion(@Param() id: deleteByIdDto): Promise<Question> {
    const deletedUser = await this.questionService.delete(id);

    return deletedUser;
  }
}
