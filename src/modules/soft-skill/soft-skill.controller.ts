import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SoftSkillService } from './soft-skill.service';
import { CreateSoftSkillDto } from './dto/soft-skill.dto';
import { SoftSkill } from 'src/types/soft-skill.type';
import { findByIdDto } from 'src/common/dto/findById.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/user-role.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import {
  CreateSoftSkillDtoRequest,
  CreateSoftSkillDtoResponse,
  GetSoftSkillDtoResponse,
} from './dto/soft-skill-swagger.dto';

@ApiTags('Soft Skill')
@Controller('soft-skills')
export class SoftSkillController {
  constructor(private readonly softSkillService: SoftSkillService) {}

  @Post()
  @HttpCode(201)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Add soft skill' })
  @ApiBearerAuth()
  @ApiBody({
    type: CreateSoftSkillDtoRequest,
    description: 'JSON structure for soft skill',
  })
  @ApiResponse({
    type: CreateSoftSkillDtoResponse,
    status: 201,
    description: 'The soft skill has been successfully created',
  })
  async createSoftSkill(
    @Body() createSoftSkillDto: CreateSoftSkillDto,
  ): Promise<SoftSkill> {
    const newSoftSkill = await this.softSkillService.create(createSoftSkillDto);

    return newSoftSkill;
  }

  @Get(':id')
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get soft skill' })
  @ApiBearerAuth()
  @ApiResponse({
    type: GetSoftSkillDtoResponse,
    status: 201,
    description: 'The soft skill has been successfully created',
  })
  @ApiResponse({
    status: 404,
    description: 'Soft skill not found',
  })
  async getSoftSkill(@Param() softSkillId: findByIdDto): Promise<SoftSkill> {
    const fetchedSoftSkill = await this.softSkillService.get(softSkillId);

    return fetchedSoftSkill;
  }
}
