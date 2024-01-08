import { PickType } from '@nestjs/mapped-types';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class TestDto {
  @IsNotEmpty()
  @IsString()
  _id: ObjectId;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsArray()
  questions: string[];

  created_at: Date;
}

export class CreateTestDto extends PickType(TestDto, [
  'title',
  'questions',
] as const) {}
