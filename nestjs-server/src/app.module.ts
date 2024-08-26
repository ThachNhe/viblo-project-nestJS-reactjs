import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { FileUploadModule } from './file-upload/file-upload.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { PostModule } from './post/post.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from './tag/tag.module';
@Module({
  imports: [
    // TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    FileUploadModule,
    PostModule,
    TagModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
