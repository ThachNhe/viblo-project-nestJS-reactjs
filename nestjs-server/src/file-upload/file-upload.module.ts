import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { MinioController } from './file-upload.controller';
@Module({
  imports: [],
  providers: [FileUploadService],
  controllers: [MinioController],
})
export class FileUploadModule {}
