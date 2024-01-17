import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoftSkill as SoftSkillDB } from 'src/database/models/soft-skill.schema';
import { CreateSoftSkillDto } from './dto/soft-skill.dto';
import { SoftSkill } from 'src/types/soft-skill.type';
import { findByIdDto } from 'src/common/dto/findById.dto';
import { LoggerService } from 'src/common/helpers/winston.logger';
import { deleteByIdDto } from 'src/common/dto/deleteById.dto';

@Injectable()
export class SoftSkillService {
  constructor(
    @InjectModel(SoftSkillDB.name)
    private readonly softSkillModel: Model<SoftSkillDB>,
    private readonly logger: LoggerService,
  ) {}

  async create(createSoftSkillDto: CreateSoftSkillDto): Promise<SoftSkill> {
    const softSkill = new this.softSkillModel(createSoftSkillDto);
    softSkill.created_at = new Date();

    const newSoftSkill = await softSkill.save();

    return newSoftSkill;
  }

  async getAll(): Promise<SoftSkill[]> {
    const fetchedSoftSkills = await this.softSkillModel.find({});

    if (fetchedSoftSkills.length === 0) {
      this.logger.error('Soft skills not found');
      throw new HttpException('Soft skills not found', HttpStatus.NOT_FOUND);
    }

    return fetchedSoftSkills;
  }

  async get(softSkillId: findByIdDto): Promise<SoftSkill> {
    const { id } = softSkillId;

    const fetchedSoftSkill = await this.softSkillModel.findById(id);

    this.logger.info('Fetched soft skill:', fetchedSoftSkill);

    if (!fetchedSoftSkill) {
      this.logger.error('Soft skill not found');
      throw new HttpException('Soft skill not found', HttpStatus.NOT_FOUND);
    }

    return fetchedSoftSkill;
  }

  async delete(softSkillId: deleteByIdDto): Promise<SoftSkill> {
    const { id } = softSkillId;

    const deletedSoftSkill = await this.softSkillModel.findByIdAndDelete(id);

    this.logger.info('Deleted soft skill:', deletedSoftSkill);

    if (!deletedSoftSkill) {
      this.logger.error('Soft skill not found');
      throw new HttpException('Soft skill not found', HttpStatus.NOT_FOUND);
    }

    return deletedSoftSkill;
  }
}
