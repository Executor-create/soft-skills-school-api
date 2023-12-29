import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { QuestionDto } from './question.dto';

export class CreateQuestionRequest extends OmitType(QuestionDto, [
  '_id',
  'created_at',
] as const) {}

export class CreateQuestionResponse extends QuestionDto {}

export class GetQuestionResponse extends QuestionDto {}

export class DeleteQuestionResponse extends QuestionDto {}

export class UpdateQuestionRequest extends PickType(QuestionDto, [
  'question',
] as const) {
  @ApiProperty({
    example: 'Do you have good soft skills?',
    required: true,
  })
  question: string;
}

export class UpdateQuestionResponse extends QuestionDto {
  @ApiProperty({
    example: 'Do you have good soft skills?',
    required: true,
  })
  question: string;
}
