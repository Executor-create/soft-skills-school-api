import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Question } from 'src/types/question.type';
import { QuestionService } from './question.service';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/question.dto';
import { findByIdDto } from 'src/common/dto/findById.dto';
import { deleteByIdDto } from 'src/common/dto/deleteById.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateQuestionRequest,
  CreateQuestionResponse,
  DeleteQuestionResponse,
  GetQuestionResponse,
  UpdateQuestionRequest,
  UpdateQuestionResponse,
} from './dto/question-swagger.dto';
import { UpdateByIdDto } from 'src/common/dto/updateById.dto';

@ApiTags('Question')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Add question' })
  @ApiBody({
    type: CreateQuestionRequest,
    description: 'JSON structure for question',
  })
  @ApiResponse({
    type: CreateQuestionResponse,
    status: 200,
    description: 'The question has been successfully created',
  })
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const question = await this.questionService.create(createQuestionDto);

    return question;
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all questions' })
  async getAllQuestions(): Promise<Question[]> {
    const questions = await this.questionService.getAll();

    return questions;
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get question' })
  @ApiResponse({
    type: GetQuestionResponse,
    status: 200,
    description: 'The question successfully retrieve from database',
  })
  @ApiResponse({
    status: 404,
    description: 'Question not found',
  })
  async getQuestion(@Param() id: findByIdDto): Promise<Question> {
    const fetchedQuestion = await this.questionService.get(id);

    return fetchedQuestion;
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete question' })
  @ApiResponse({
    type: DeleteQuestionResponse,
    status: 200,
    description: 'The question successfully deleted from database',
  })
  @ApiResponse({
    status: 404,
    description: 'Question not found',
  })
  async deleteQuestion(@Param() id: deleteByIdDto): Promise<Question> {
    const deletedQuestion = await this.questionService.delete(id);

    return deletedQuestion;
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update question' })
  @ApiBody({
    type: UpdateQuestionRequest,
    description: 'JSON structure for update question',
  })
  @ApiResponse({
    type: UpdateQuestionResponse,
    status: 200,
    description: 'The question successfully updated',
  })
  async updateQuestion(
    @Param() id: UpdateByIdDto,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const updatedQuestion = await this.questionService.update(
      id,
      updateQuestionDto,
    );

    return updatedQuestion;
  }
}
