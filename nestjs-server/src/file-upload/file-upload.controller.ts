import { Controller, Body, Put, Query, Get, UseGuards } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  ImageUrlResponseDTO,
  PresignedUrlResponseDTO,
} from './dto/file-upload-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileUploadDTO } from './dto/file-upload.dto';

@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: FileUploadService) {}

  @Put('presigned-url')
  @ApiOkResponse({ type: PresignedUrlResponseDTO })
  @UseGuards(AuthGuard('jwt'))
  async getPresignedUrl(@Query() query: FileUploadDTO) {
    const bucketName = 'test';
    const objectName = query.fileName;
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
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: ImageUrlResponseDTO })
  async getPresignedGetUrl(@Query() query: FileUploadDTO) {
    const bucketName = 'test';
    const objectName = query.fileName;
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
