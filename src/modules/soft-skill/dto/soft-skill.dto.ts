import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { CharacteristicWithId } from 'src/types/soft-skill.type';

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

  @ApiProperty({
    example: [
      {
        characteristicId: '65b5c1cf9bb8450eb5c8009a',
        title: 'Empathy',
      },
    ],
    required: false,
  })
  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  characteristics?: CharacteristicWithId[];

  @ApiProperty()
  created_at: Date;
}

export class CreateSoftSkillDto extends OmitType(SoftSkillDto, [
  '_id',
  'created_at',
] as const) {}

export class UpdateSoftSkillDto extends OmitType(SoftSkillDto, [
  '_id',
  'created_at',
] as const) {
  @IsOptional()
  type: string;

  @IsOptional()
  characteristics?: CharacteristicWithId[];
}
