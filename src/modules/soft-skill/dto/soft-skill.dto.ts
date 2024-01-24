import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class SoftSkillDto {
  @ApiProperty({
    example: '659c6ea61266eb9da8f600fc',
    required: true,
  })
  _id: ObjectId;

  @ApiProperty({
    example: 'Communication',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  created_at: Date;
}

export class CreateSoftSkillDto extends PickType(SoftSkillDto, [
  'type',
] as const) {}

export class UpdateSoftSkillDto extends PickType(SoftSkillDto, [
  'type',
] as const) {}
