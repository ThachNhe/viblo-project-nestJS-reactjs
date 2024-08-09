import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MinioClientModule } from './minio-client/minio-client.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true }), MinioClientModule, FileUploadModule],
})
export class AppModule {

}
