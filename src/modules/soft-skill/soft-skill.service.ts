import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { SoftSkill as SoftSkillDB } from 'src/database/models/soft-skill.schema';
import { CreateSoftSkillDto, UpdateSoftSkillDto } from './dto/soft-skill.dto';
import { SoftSkill } from 'src/types/soft-skill.type';
import { findByIdDto } from 'src/common/dto/findById.dto';
import { LoggerService } from 'src/common/helpers/winston.logger';
import { deleteByIdDto } from 'src/common/dto/deleteById.dto';
import { UpdateByIdDto } from 'src/common/dto/updateById.dto';
import { Characteristic } from 'src/database/models/characteristic.schema';

@Injectable()
export class SoftSkillService {
  constructor(
    @InjectModel(SoftSkillDB.name)
    private readonly softSkillModel: Model<SoftSkillDB>,
    @InjectModel(Characteristic.name)
    private readonly characteristicModel: Model<Characteristic>,
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

  async update(
    softSkillId: UpdateByIdDto,
    updateSoftSkillDto: UpdateSoftSkillDto,
  ): Promise<SoftSkill> {
    const { id } = softSkillId;
    const { type } = updateSoftSkillDto;

    const updatedSoftSkill = await this.softSkillModel.findByIdAndUpdate(
      id,
      { type },
      { new: true },
    );

    if (!updatedSoftSkill) {
      this.logger.error('Soft skill not found');
      throw new HttpException('Soft skill not found', HttpStatus.NOT_FOUND);
    }

    await this.updateCharacteristicBasedOnSoftSkill(id, type);

    return updatedSoftSkill;
  }

  async updateCharacteristicBasedOnSoftSkill(
    softSkillId: string,
    updatedType: string,
  ): Promise<void> {
    if (!isValidObjectId(softSkillId)) {
      this.logger.error('Invalid ObjectId format');
      throw new HttpException(
        'Invalid ObjectId format',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedCharacteristic = await this.characteristicModel.updateMany(
      { 'softSkill.softSkillId': { $eq: softSkillId } },
      { $set: { 'softSkill.type': updatedType } },
    );

    this.logger.info(
      `Updated ${updatedCharacteristic.modifiedCount} characteristics for soft skill with ID:`,
      softSkillId,
    );
  }
}
