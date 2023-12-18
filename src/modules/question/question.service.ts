import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question as QuestionDB } from 'src/database/models/question.schema';
import { CreateQuestionDto } from './dto/question.dto';
import { Question } from 'src/types/question.type';
import { LoggerService } from 'src/common/helpers/winston.logger';

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
}
