import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoftSkill as SoftSkillDB } from 'src/database/models/soft-skill.schema';
import { CreateSoftSkillDto } from './dto/soft-skill.dto';
import { SoftSkill } from 'src/types/soft-skill.type';

@Injectable()
export class SoftSkillService {
  constructor(
    @InjectModel(SoftSkillDB.name)
    private readonly softSkillModel: Model<SoftSkillDB>,
  ) {}

  async create(createSoftSkillDto: CreateSoftSkillDto): Promise<SoftSkill> {
    const softSkill = new this.softSkillModel(createSoftSkillDto);
    softSkill.created_at = new Date();

    const newSoftSkill = await softSkill.save();

    return newSoftSkill;
  }
}
