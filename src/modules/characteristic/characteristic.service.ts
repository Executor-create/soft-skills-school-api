import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, isValidObjectId } from 'mongoose';
import { LoggerService } from 'src/common/helpers/winston.logger';
import { Characteristic as CharacteristicDB } from 'src/database/models/characteristic.schema';
import { Characteristic } from 'src/types/characteristic.type';
import { CreateCharacteristicDto } from './dto/characteristic.dto';
import { SoftSkill } from 'src/types/soft-skill.type';
import { SoftSkill as SoftSkillDB } from 'src/database/models/soft-skill.schema';
import { findByIdDto } from 'src/common/dto/findById.dto';

@Injectable()
export class CharacteristicService {
  constructor(
    @InjectModel(CharacteristicDB.name)
    private readonly characteristicModel: Model<CharacteristicDB>,
    @InjectModel(SoftSkillDB.name)
    private readonly softSkillModel: Model<SoftSkillDB>,
    private readonly logger: LoggerService,
  ) {}

  async create(
    createCharacteristicDto: CreateCharacteristicDto,
  ): Promise<Characteristic> {
    const { softSkillId } = createCharacteristicDto.softSkill;

    if (!isValidObjectId(softSkillId)) {
      this.logger.error('Invalid ObjectID format');
      throw new HttpException(
        'Invalid ObjectID format',
        HttpStatus.BAD_REQUEST,
      );
    }

    const softSkill = await this.findSoftSkillById(softSkillId);

    const { created_at } = softSkill;

    const newCharacteristic = new this.characteristicModel(
      createCharacteristicDto,
    );
    newCharacteristic.softSkill.created_at = created_at;
    newCharacteristic.created_at = new Date();

    const savedCharacteristic = await newCharacteristic.save();

    this.logger.info('Created new characteristic:', savedCharacteristic);

    return savedCharacteristic;
  }

  async findSoftSkillById(id: ObjectId): Promise<SoftSkill> {
    const fetchedSoftSkill = await this.softSkillModel.findById(id);

    this.logger.info('Fetched soft skill:', fetchedSoftSkill);

    if (!fetchedSoftSkill) {
      this.logger.error('Soft skill not found');
      throw new HttpException('Soft skill not found', HttpStatus.NOT_FOUND);
    }

    return fetchedSoftSkill;
  }

  async getAll(): Promise<Characteristic[]> {
    const fetchedCharacteristics = await this.characteristicModel.find({});

    if (fetchedCharacteristics.length === 0) {
      this.logger.error('Characteristics not found');
      throw new HttpException(
        'Characteristics not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return fetchedCharacteristics;
  }

  async get(characteristicId: findByIdDto): Promise<Characteristic> {
    const { id } = characteristicId;

    const fetchedCharacteristic = await this.characteristicModel.findById(id);

    if (!fetchedCharacteristic) {
      this.logger.error('Characteristic not found');
      throw new HttpException('Characteristic not found', HttpStatus.NOT_FOUND);
    }

    return fetchedCharacteristic;
  }
}
