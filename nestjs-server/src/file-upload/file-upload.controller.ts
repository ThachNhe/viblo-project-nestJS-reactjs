import { Controller, Body, Put, Query, Get } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';

@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: FileUploadService) {}

  @Put('presigned-url')
  async getPresignedUrl(@Body('fileName') fileName: string) {
    // console.log('check file  :', fileName);
    const bucketName = 'test';
    const objectName = fileName;
    const expirySeconds = 60 * 60 * 60;

    const presignedURL = await this.minioService.generatePresignedUrl(
      bucketName,
      objectName,
      expirySeconds,
    );

    return {
      status: 'success',
      presignedURL,
    };
  }

  @Get('presigned-get-url')
  async getPresignedGetUrl(@Query('fileName') fileName: string) {
    const bucketName = 'test';
    const objectName = fileName;
    const expirySeconds = 60 * 60 * 60;
    const imageURL = await this.minioService.generatePresignedGetUrl(
      bucketName,
      objectName,
      expirySeconds,
    );
    return {
      status: 'success',
      imageURL,
    };
  }
}
