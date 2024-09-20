import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  Answer,
  Comment,
  Notification,
  NotificationDetail,
  Post,
  Question,
  Series,
  Tag,
  User,
  UserPost,
} from './entity/index';

import { StatisticsModule } from './statistics/statistics.module';
import { DatabaseClearUtil } from '../test/database-clear.util';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: true,
        logging: false,
        entities: [
          User,
          Post,
          Comment,
          Series,
          Question,
          Answer,
          Tag,
          Notification,
          NotificationDetail,
          UserPost,
        ],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    FileUploadModule,
    PostModule,
    TagModule,
    CommentModule,
    StatisticsModule,
  ],
  providers: [DatabaseClearUtil], // Add utility to providers
  controllers: [],
})
export class AppModule implements NestModule {
  constructor(
    private configService: ConfigService,
    private databaseClearUtil: DatabaseClearUtil, // Inject utility
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

  async clearDatabase() {
    // Method to clear database, can be called from tests
    await this.databaseClearUtil.clearDatabase();
  }
}
