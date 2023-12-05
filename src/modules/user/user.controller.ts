import { Controller, Get, Param } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { findByIdDto } from 'src/common/dto/findById.dto';
import { User } from 'src/types/user.type';
import { UserService } from './user.service';
import { isValidObjectId } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User as UserDB } from 'src/database/models/user.schema';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user' })
  @ApiBody({ type: findByIdDto, description: 'Parameter for get user' })
  @ApiResponse({
    type: UserDB,
    status: 200,
    description: 'The user successfully retrieve from database',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUser(@Param() id: findByIdDto): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }

    const fetchedUser = await this.userService.findUserById(id);

    return fetchedUser;
  }
}
