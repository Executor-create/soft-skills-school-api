import { ApiProperty, OmitType } from '@nestjs/swagger';
import { QuestionDto } from './question.dto';

export class CreateQuestionRequest extends OmitType(QuestionDto, [
  '_id',
  'created_at',
] as const) {}

export class CreateQuestionResponse extends QuestionDto {}

export class GetQuestionResponse extends QuestionDto {}

export class DeleteQuestionResponse extends QuestionDto {}

export class UpdateQuestionRequest extends OmitType(QuestionDto, [
  '_id',
  'created_at',
] as const) {
  @ApiProperty({
    example: 'Do you have good soft skills',
    required: true,
  })
  question: string;
}

export class UpdateQuestionResponse extends OmitType(QuestionDto, [
  '_id',
  'created_at',
] as const) {
  @ApiProperty({
    example: 'Do you have good soft skills',
    required: true,
  })
  question: string;
}
