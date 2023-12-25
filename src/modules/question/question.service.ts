import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question as QuestionDB } from 'src/database/models/question.schema';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/question.dto';
import { Question } from 'src/types/question.type';
import { LoggerService } from 'src/common/helpers/winston.logger';
import { findByIdDto } from 'src/common/dto/findById.dto';
import { deleteByIdDto } from 'src/common/dto/deleteById.dto';
import { UpdateByIdDto } from 'src/common/dto/updateById.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(QuestionDB.name)
    private readonly questionModel: Model<QuestionDB>,
    private readonly logger: LoggerService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = new this.questionModel(createQuestionDto);
    question.created_at = new Date();

    const newQuestion = await question.save();

    this.logger.info('Created question:', newQuestion);

    return newQuestion;
  }

  async getAll(): Promise<Question[]> {
    const fetchedQuestions = await this.questionModel.find({});

    if (fetchedQuestions.length === 0) {
      this.logger.error('Items not found');
      throw new HttpException('Items not found', HttpStatus.NOT_FOUND);
    }

    return fetchedQuestions;
  }

  async get(questionId: findByIdDto): Promise<Question> {
    const { id } = questionId;

    const fetchedQuestion = await this.questionModel.findById(id);

    this.logger.info('Fetched user:', fetchedQuestion);

    if (!fetchedQuestion) {
      this.logger.error('Question not found');
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }

    return fetchedQuestion;
  }

  async delete(questionId: deleteByIdDto): Promise<Question> {
    const { id } = questionId;

    const deletedQuestion = await this.questionModel.findByIdAndDelete(id);

    this.logger.info('Deleted user:', deletedQuestion);

    if (!deletedQuestion) {
      this.logger.error('Question not found');
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }

    return deletedQuestion;
  }

  async update(
    questionId: UpdateByIdDto,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const { id } = questionId;

    const updatedQuestion = await this.questionModel.findByIdAndUpdate(
      id,
      updateQuestionDto,
      { new: true },
    );

    if (!updatedQuestion) {
      this.logger.error('Question not found');
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }

    return updatedQuestion;
  }
}
