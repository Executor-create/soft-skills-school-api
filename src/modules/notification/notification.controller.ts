import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Sse,
  UseGuards,
} from '@nestjs/common';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from './dto/notification.dto';
import { Notification } from 'src/types/notification.type';
import { NotificationService } from './notification.service';
import { findByIdDto } from 'src/common/dto/findById.dto';
import { deleteByIdDto } from 'src/common/dto/deleteById.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/user-role.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateNotificationRequest,
  CreateNotificationResponse,
  DeleteNotificationResponse,
  GetAllNotificationsResponse,
  GetNotificationResponse,
} from './dto/notification-swagger.dto';
import { Observable } from 'rxjs';

@ApiTags('Notification')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @HttpCode(201)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Add notification' })
  @ApiBearerAuth()
  @ApiBody({
    type: CreateNotificationRequest,
    description: 'JSON structure for notification',
  })
  @ApiResponse({
    type: CreateNotificationResponse,
    status: 200,
    description: 'The notification has been successfully created',
  })
  async create(@Body() body: CreateNotificationDto): Promise<Notification> {
    const notification = await this.notificationService.create(body);

    return notification;
  }

  @Sse('stream')
  @ApiOperation({ summary: 'Stream notifications via SSE' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Real-time notification stream',
  })
  streamNotifications(): Observable<any> {
    return this.notificationService.streamNotifications();
  }

  @Get()
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiBearerAuth()
  @ApiResponse({
    type: [GetAllNotificationsResponse],
    status: 200,
    description: 'The notifications successfully retrieve from database',
  })
  async getAll(): Promise<Notification[]> {
    const fetchedNotifications = await this.notificationService.getAll();

    return fetchedNotifications;
  }

  @Get(':id')
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get notification' })
  @ApiBearerAuth()
  @ApiResponse({
    type: GetNotificationResponse,
    status: 200,
    description: 'The notification successfully retrieve from database',
  })
  @ApiResponse({
    status: 404,
    description: 'Notification not found',
  })
  async get(@Param() id: findByIdDto): Promise<Notification> {
    const fetchedNotification = await this.notificationService.get(id);

    return fetchedNotification;
  }

  @Delete(':id')
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete notification' })
  @ApiBearerAuth()
  @ApiResponse({
    type: DeleteNotificationResponse,
    status: 200,
    description: 'The notification successfully deleted from database',
  })
  @ApiResponse({
    status: 404,
    description: 'Notification not found',
  })
  async delete(@Param() id: deleteByIdDto): Promise<Notification> {
    const deletedNotification = await this.notificationService.delete(id);

    return deletedNotification;
  }

  @Patch(':id')
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update notification' })
  @ApiBearerAuth()
  async update(
    @Param() id: findByIdDto,
    @Body() body: UpdateNotificationDto,
  ): Promise<Notification> {
    const updatedNotification = await this.notificationService.update(id, body);

    return updatedNotification;
  }
}
