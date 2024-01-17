import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SoftSkillService } from './soft-skill.service';
import { CreateSoftSkillDto } from './dto/soft-skill.dto';
import { SoftSkill } from 'src/types/soft-skill.type';
import { findByIdDto } from 'src/common/dto/findById.dto';

@ApiTags('Soft Skill')
@Controller('soft-skills')
export class SoftSkillController {
  constructor(private readonly softSkillService: SoftSkillService) {}

  @Post()
  @HttpCode(201)
  async createSoftSkill(
    @Body() createSoftSkillDto: CreateSoftSkillDto,
  ): Promise<SoftSkill> {
    const newSoftSkill = await this.softSkillService.create(createSoftSkillDto);

    return newSoftSkill;
  }

  @Get(':id')
  @HttpCode(200)
  async getSoftSkill(@Param() softSkillId: findByIdDto): Promise<SoftSkill> {
    const fetchedSoftSkill = await this.softSkillService.get(softSkillId);

    return fetchedSoftSkill;
  }
}
