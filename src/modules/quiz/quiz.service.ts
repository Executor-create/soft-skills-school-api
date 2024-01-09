import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { LoggerService } from 'src/common/helpers/winston.logger';
import { Test as TestDB } from 'src/database/models/test.schema';
import { Question } from 'src/database/models/question.schema';
import { CreateTestDto } from './dto/quiz.dto';
import { Test } from 'src/types/test.type';
import { findByIdDto } from 'src/common/dto/findById.dto';
import { deleteByIdDto } from 'src/common/dto/deleteById.dto';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(TestDB.name) private readonly testModel: Model<TestDB>,
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
    private readonly logger: LoggerService,
  ) {}

  async create(createTestDto: CreateTestDto): Promise<Test> {
    const { questions } = createTestDto;

    const test = new this.testModel(createTestDto);
    test.questions = (questions as string[]).map((questionId: string) => {
      return mongoose.Types.ObjectId.createFromHexString(questionId) as any;
    });
    test.created_at = new Date();

    const newTest = await test.save();

    this.logger.info('Created test:', newTest);

    return newTest;
  }

  async getAll(): Promise<Test[]> {
    const fetchedTests = await this.testModel.find({});

    if (fetchedTests.length === 0) {
      this.logger.error('Tests not found');
      throw new HttpException('Tests not found', HttpStatus.NOT_FOUND);
    }

    return fetchedTests;
  }

  async get(testId: findByIdDto): Promise<Test> {
    const { id } = testId;

    const fetchedTest = await this.testModel.findById(id);

    this.logger.info('Fetched test:', fetchedTest);

    if (!fetchedTest) {
      this.logger.error('Test not found');
      throw new HttpException('Test not found', HttpStatus.NOT_FOUND);
    }

    return fetchedTest;
  }

  async delete(testId: deleteByIdDto): Promise<Test> {
    const { id } = testId;

    const deletedTest = await this.testModel.findByIdAndDelete(id);

    this.logger.info('Deleted test:', deletedTest);

    if (!deletedTest) {
      this.logger.error('Test not found');
      throw new HttpException('Test not found', HttpStatus.NOT_FOUND);
    }

    return deletedTest;
  }
}
