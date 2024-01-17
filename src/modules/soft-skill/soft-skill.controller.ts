import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SoftSkillService } from './soft-skill.service';
import { CreateSoftSkillDto } from './dto/soft-skill.dto';
import { SoftSkill } from 'src/types/soft-skill.type';

@ApiTags('Soft Skill')
@Controller('soft-skills')
export class SoftSkillController {
  constructor(private readonly softSkillService: SoftSkillService) {}

  @Post()
  async createSoftSkill(
    @Body() createSoftSkillDto: CreateSoftSkillDto,
  ): Promise<SoftSkill> {
    const newSoftSkill = await this.softSkillService.create(createSoftSkillDto);

    return newSoftSkill;
  }
}
