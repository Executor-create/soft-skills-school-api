import { Module } from '@nestjs/common';
import { SoftSkillService } from './soft-skill.service';
import { SoftSkillController } from './soft-skill.controller';

@Module({
  providers: [SoftSkillService],
  controllers: [SoftSkillController],
})
export class SoftSkillModule {}
