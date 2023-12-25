import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuestionDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  _id: string;

  @ApiProperty({
    example: 'You are good communicator',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({
    example: 'multiple_choice',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    example: 'Communication',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    example: 3,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  points: number;

  @ApiProperty()
  created_at: Date;
}

export class CreateQuestionDto extends OmitType(QuestionDto, [
  '_id',
  'created_at',
] as const) {}

export class UpdateQuestionDto extends OmitType(QuestionDto, [
  '_id',
  'created_at',
] as const) {}
