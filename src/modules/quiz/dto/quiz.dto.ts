import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class TestDto {
  @ApiProperty({
    example: '659c6ea61266eb9da8f600fc',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  _id: ObjectId;

  @ApiProperty({
    example: 'Belbin test',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: ['6589f4d63e0c5b3029146e70', '6595864ee4eccdb3a64c8072'],
    required: true,
  })
  @IsNotEmpty()
  @IsArray()
  questions: string[];

  @ApiProperty()
  created_at: Date;
}

export class CreateTestDto extends PickType(TestDto, [
  'title',
  'questions',
] as const) {}
