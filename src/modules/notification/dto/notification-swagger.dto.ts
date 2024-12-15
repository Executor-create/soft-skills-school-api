import { PickType } from '@nestjs/swagger';
import { NotificationDto } from './notification.dto';

export class CreateNotificationRequest extends PickType(NotificationDto, [
  'studentId',
  'ownerId',
  'meta',
  'title',
  'type',
] as const) {}

export class CreateNotificationResponse extends NotificationDto {}

export class GetNotificationResponse extends NotificationDto {}

export class DeleteNotificationResponse extends NotificationDto {}

export class GetAllNotificationsResponse extends NotificationDto {}
