import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { findByIdDto } from 'src/common/dto/findById.dto';
import { User } from 'src/types/user.type';
import { UserService } from './user.service';
import { isValidObjectId } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { GetUserResponse } from './dto/user-swagger.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/user-role.enum';
import { RolesGuard } from 'src/common/guards/role.guard';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @HttpCode(200)
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get user' })
  @ApiBearerAuth()
  @ApiResponse({
    type: GetUserResponse,
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
