import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserDB } from 'src/database/models/user.schema';
import { User } from 'src/types/user.type';
import { SignUpDto } from './dto/auth.dto';
import { LoggerService } from 'src/common/helpers/winston.logger';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserDB.name)
    private readonly userModel: Model<UserDB>,
    private readonly logger: LoggerService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel(signUpDto);
    user.password = hashedPassword;
    user.created_at = new Date();

    const newUser = await user.save();

    this.logger.info('Created user:', newUser);

    return newUser;
  }
}
