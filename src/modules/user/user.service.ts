import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { findByIdDto } from 'src/common/dto/findById.dto';
import { UpdateByIdDto } from 'src/common/dto/updateById.dto';
import { LoggerService } from 'src/common/helpers/winston.logger';
import { User as UserDB } from 'src/database/models/user.schema';
import { User } from 'src/types/user.type';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserDB.name) private readonly userModel: Model<UserDB>,
    private readonly logger: LoggerService,
  ) {}

  async findUserById(userId: findByIdDto): Promise<User> {
    const { id } = userId;

    const fetchedUser = await this.userModel.findById(id);

    this.logger.info('Fetched user:', fetchedUser);

    if (!fetchedUser) {
      this.logger.error('User not found');
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return fetchedUser;
  }

  async update(
    userId: UpdateByIdDto,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { id } = userId;

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );

    this.logger.info('Updated user:', updatedUser);

    if (!updatedUser) {
      this.logger.error('User not found');
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return updatedUser;
  }
}
