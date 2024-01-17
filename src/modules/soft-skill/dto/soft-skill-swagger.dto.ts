import { PickType } from '@nestjs/swagger';
import { SoftSkillDto } from './soft-skill.dto';

export class CreateSoftSkillDtoRequest extends PickType(SoftSkillDto, [
  'type',
] as const) {}

export class CreateSoftSkillDtoResponse extends SoftSkillDto {}

export class GetSoftSkillDtoResponse extends SoftSkillDto {}
