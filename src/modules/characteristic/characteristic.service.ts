import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoggerService } from 'src/common/helpers/winston.logger';
import { Characteristic as CharacteristicDB } from 'src/database/models/characteristic.schema';
import { Characteristic } from 'src/types/characteristic.type';
import { CreateCharacteristicDto } from './dto/characteristic.dto';
import { findByIdDto } from 'src/common/dto/findById.dto';
import { deleteByIdDto } from 'src/common/dto/deleteById.dto';

@Injectable()
export class CharacteristicService {
  constructor(
    @InjectModel(CharacteristicDB.name)
    private readonly characteristicModel: Model<CharacteristicDB>,
    private readonly logger: LoggerService,
  ) {}

  async create(
    createCharacteristicDto: CreateCharacteristicDto,
  ): Promise<Characteristic> {
    const newCharacteristic = new this.characteristicModel(
      createCharacteristicDto,
    );
    newCharacteristic.created_at = new Date();

    const savedCharacteristic = await newCharacteristic.save();

    this.logger.info('Created new characteristic:', savedCharacteristic);

    return savedCharacteristic;
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

  async delete(characteristicId: deleteByIdDto): Promise<Characteristic> {
    const { id } = characteristicId;

    const deletedCharacteristic =
      await this.characteristicModel.findByIdAndDelete(id);

    if (!deletedCharacteristic) {
      this.logger.error('Characteristic not found');
      throw new HttpException('Characteristic not found', HttpStatus.NOT_FOUND);
    }

    return deletedCharacteristic;
  }
}
