import { Module } from '@nestjs/common';
import { SoftSkillService } from './soft-skill.service';
import { SoftSkillController } from './soft-skill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SoftSkill,
  SoftSkillSchema,
} from 'src/database/models/soft-skill.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SoftSkill.name, schema: SoftSkillSchema },
    ]),
  ],
  providers: [SoftSkillService],
  controllers: [SoftSkillController],
})
export class SoftSkillModule {}
