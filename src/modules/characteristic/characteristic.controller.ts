import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CharacteristicService } from './characteristic.service';
import { CreateCharacteristicDto } from './dto/characteristic.dto';
import { Characteristic } from 'src/types/characteristic.type';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/user-role.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import {
  CreateCharacteristicRequest,
  CreateCharacteristicResponse,
} from './dto/characteristic-swagger.dto';

@ApiTags('Characteristic')
@Controller('characteristics')
export class CharacteristicController {
  constructor(private readonly characteristicService: CharacteristicService) {}

  @Post()
  @HttpCode(201)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Add characteristic' })
  @ApiBearerAuth()
  @ApiBody({
    type: CreateCharacteristicRequest,
    description: 'JSON structure for characteristic',
  })
  @ApiResponse({
    type: CreateCharacteristicResponse,
    status: 201,
    description: 'The characteristic has been successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid ObjectID format',
  })
  @ApiResponse({
    status: 404,
    description: 'Soft skill not found',
  })
  async createCharacteristic(
    @Body()
    createCharacteristicDto: CreateCharacteristicDto,
  ): Promise<Characteristic> {
    const newCharacteristic = await this.characteristicService.create(
      createCharacteristicDto,
    );

    return newCharacteristic;
  }
}
