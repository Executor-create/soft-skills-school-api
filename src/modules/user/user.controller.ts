import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { findByIdDto } from 'src/common/dto/findById.dto';
import { User } from 'src/types/user.type';
import { UserService } from './user.service';
import { isValidObjectId } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  GetAllUsersResponse,
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from './dto/user-swagger.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/user-role.enum';
import { RolesGuard } from 'src/common/guards/role.guard';
import { UpdateByIdDto } from 'src/common/dto/updateById.dto';
import { UpdateUserDto } from './dto/user.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @ApiResponse({
    type: [GetAllUsersResponse],
    status: 200,
    description: 'The users successfully retrieve from database',
  })
  @ApiResponse({
    status: 404,
    description: 'Items not found',
  })
  async getAllUsers(): Promise<User[]> {
    const users = await this.userService.findAll();

    return users;
  }

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

  @Patch(':id')
  @HttpCode(200)
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateUserRequest,
    description: 'JSON structure for update user',
  })
  @ApiResponse({
    type: UpdateUserResponse,
    status: 200,
    description: 'The user has been successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async updateUser(
    @Param() id: UpdateByIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }

    const updatedUser = await this.userService.update(id, updateUserDto);

    return updatedUser;
  }
}
