import { commentType } from './../enums/comment.type.enum';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../config/serviceAccountKey.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationDetail, Notification } from '../entity';
import { formatVietnameseDate } from 'src/utils/common.function';
@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,

    @InjectRepository(NotificationDetail)
    private notificationDetailRepository: Repository<NotificationDetail>,
  ) {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount,
        ),
      });
    }
  }

  async sendNotificationToUser(
    token: string,
    postId: number,
    commenter: string,
    type: 'POST' | 'REPLY',
  ) {
    try {
      const message = {
        notification: {
          title: 'New Comment',
          body:
            type === commentType.POST
              ? 'đã bình luận bài viết của bạn '
              : 'đã nhắc đến bạn trong một bình luận',
        },
        data: {
          postId: postId.toString(),
          commenter: commenter,
        },
        token: token,
      };

      return admin.messaging().send(message);
    } catch (error) {
      console.log('Error sending message:', error);
    }
  }

  async getNotifications(userId: number) {
    const notifications = await this.notificationDetailRepository
      .createQueryBuilder('notification_details')
      .leftJoin('notification_details.notification', 'notification')
      .leftJoin('notification.author', 'author')
      .addSelect([
        'notification.content',
        'notification.id',
        'notification.commentId',
        'notification.post_slug',
        'notification.created_at',
        'author.id',
        'author.fullName',
        'author.email',
        'author.avatar',
      ])
      .where('notification_details.NotiForUser = :userId', { userId })
      .getMany();

    const newNotifications = notifications.map((notification) => {
      return {
        ...notification,
        created_at: formatVietnameseDate(`${notification.created_at}`),
      };
    });

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: newNotifications,
    };
  }

  async markAsRead(notificationId: number) {
    await this.notificationDetailRepository
      .createQueryBuilder('notification_details')
      .update()
      .set({ isRead: true })
      .where('notification_details.id = :notificationId', { notificationId })
      .execute();

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: 'Mark as read successfully',
    };
  }
}
