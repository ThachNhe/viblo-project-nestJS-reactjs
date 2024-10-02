import { Controller, Put, Query, Get, UseGuards } from '@nestjs/common';
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
    const objectName = query.fileName;

    const presignedURL = await this.minioService.generatePresignedUrl(
      process.env.MINIO_BUCKET_NAME,
      objectName,
      +process.env.MINIO_EXPIRES,
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
    const objectName = query.fileName;
    const imageURL = await this.minioService.generatePresignedGetUrl(
      process.env.MINIO_BUCKET_NAME,
      objectName,
      +process.env.MINIO_EXPIRES,
    );
    return {
      status: 'success',
      imageURL,
    };
  }
}
