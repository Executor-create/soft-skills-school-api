import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CharacteristicDto {
  @ApiProperty({
    example: '659c6ea61266eb9da8f600fc',
    required: true,
  })
  @IsNotEmpty()
  @IsMongoId()
  _id: ObjectId;

  @ApiProperty({
    example: ['Self-respect', 'Empathy'],
    required: true,
  })
  @IsNotEmpty()
  @IsArray()
  titles: string[];

  @ApiProperty({
    type: 'object',
    properties: {
      softSkillId: {
        example: '507f1f77bcf86cd799439011',
      },
      type: {
        example: 'Communication',
      },
    },
    required: true,
  })
  @IsObject()
  @IsNotEmptyObject()
  softSkill: {
    softSkillId: ObjectId;
    type: string;
  };

  @ApiProperty()
  created_at: Date;
}

export class CreateCharacteristicDto extends OmitType(CharacteristicDto, [
  '_id',
  'created_at',
] as const) {}
