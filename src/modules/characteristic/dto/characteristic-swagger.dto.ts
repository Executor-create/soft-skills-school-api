import { OmitType } from '@nestjs/swagger';
import { CharacteristicDto } from './characteristic.dto';

export class CreateCharacteristicRequest extends OmitType(CharacteristicDto, [
  '_id',
  'created_at',
] as const) {}

export class CreateCharacteristicResponse extends CharacteristicDto {}
