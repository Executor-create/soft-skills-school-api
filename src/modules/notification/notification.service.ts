import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/notification.dto';
import { Notification } from 'src/types/notification.type';
import { InjectModel } from '@nestjs/mongoose';
import { Notification as NotificationDB } from 'src/database/models/notification.schema';
import { Model, Types } from 'mongoose';
import { User as UserDB } from 'src/database/models/user.schema';
import { LoggerService } from 'src/common/helpers/winston.logger';
import { findByIdDto } from 'src/common/dto/findById.dto';
import { deleteByIdDto } from 'src/common/dto/deleteById.dto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class NotificationService {
  private notificationSubject = new Subject<Notification>();

  constructor(
    @InjectModel(NotificationDB.name)
    private readonly notificationModel: Model<NotificationDB>,
    @InjectModel(UserDB.name)
    private readonly userModel: Model<UserDB>,
    private readonly logger: LoggerService,
  ) {}

  async create(body: CreateNotificationDto): Promise<Notification> {
    const { studentId } = body;

    await this.checkStudentExists(studentId);

    const notification = new this.notificationModel({
      ...body,
      status: 'unread',
      created_at: new Date(),
      updated_at: null,
    });

    const savedNotification = await notification.save();

    this.notificationSubject.next(savedNotification);

    return savedNotification;
  }

  async checkStudentExists(id: string): Promise<void> {
    const fetchedUser = await this.userModel.findById(new Types.ObjectId(id));

    if (!fetchedUser) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
  }

  async getAll(): Promise<Notification[]> {
    const fetchedNotifications = await this.notificationModel.find({});

    if (fetchedNotifications.length === 0) {
      this.logger.error('Items not found');
      throw new HttpException('Items not found', HttpStatus.NOT_FOUND);
    }

    return fetchedNotifications;
  }

  async get(notificationId: findByIdDto): Promise<Notification> {
    const { id } = notificationId;

    const fetchedNotification = await this.notificationModel.findById(id);

    if (!fetchedNotification) {
      throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
    }

    return fetchedNotification;
  }

  async delete(notificationId: deleteByIdDto): Promise<Notification> {
    const { id } = notificationId;

    const deletedNotification = await this.notificationModel.findByIdAndDelete(
      id,
    );

    if (!deletedNotification) {
      this.logger.error('Notification not found');
      throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
    }

    return deletedNotification;
  }

  streamNotifications(): Observable<any> {
    return new Observable((observer) => {
      const subscription = this.notificationSubject.subscribe(
        (notification) => {
          observer.next({
            data: notification,
            id: notification._id.toString(),
            event: 'notification',
          });
        },
      );

      return () => subscription.unsubscribe();
    });
  }
}
