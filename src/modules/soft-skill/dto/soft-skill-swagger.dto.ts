import { PickType } from '@nestjs/swagger';
import { SoftSkillDto } from './soft-skill.dto';

export class CreateSoftSkillRequest extends PickType(SoftSkillDto, [
  'type',
] as const) {}

export class CreateSoftSkillResponse extends SoftSkillDto {}

export class GetSoftSkillResponse extends SoftSkillDto {}

export class DeleteSoftSkillResponse extends SoftSkillDto {}
