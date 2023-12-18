import { Body, Controller, Post } from '@nestjs/common';
import { Question } from 'src/types/question.type';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/question.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const question = await this.questionService.create(createQuestionDto);

    return question;
  }
}
