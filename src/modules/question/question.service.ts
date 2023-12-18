import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question as QuestionDB } from 'src/database/models/question.schema';
import { CreateQuestionDto } from './dto/question.dto';
import { Question } from 'src/types/question.type';
import { LoggerService } from 'src/common/helpers/winston.logger';
import { findByIdDto } from 'src/common/dto/findById.dto';
import { deleteByIdDto } from 'src/common/dto/deleteById.dto';

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

  async get(questionId: findByIdDto): Promise<Question> {
    const { id } = questionId;

    const fetchedUser = await this.questionModel.findById(id);

    this.logger.info('Fetched user:', fetchedUser);

    if (!fetchedUser) {
      this.logger.error('Question not found');
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }

    return fetchedUser;
  }

  async delete(questionId: deleteByIdDto): Promise<Question> {
    const { id } = questionId;

    const deletedUser = await this.questionModel.findByIdAndDelete(id);

    this.logger.info('Deleted user:', deletedUser);

    if (!deletedUser) {
      this.logger.error('Question not found');
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }

    return deletedUser;
  }
}
