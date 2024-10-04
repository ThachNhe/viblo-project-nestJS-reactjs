import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Comment,
  Notification,
  NotificationDetail,
  Post,
  User,
} from '../entity/index';
import { CommentGateway } from './comment.gateway';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comment,
      Post,
      User,
      Notification,
      NotificationDetail,
    ]),
    NotificationModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentGateway],
})
export class CommentModule {}
