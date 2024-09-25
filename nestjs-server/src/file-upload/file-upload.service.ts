import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
@Injectable()
export class FileUploadService {
  private readonly minioClient: Minio.Client;

  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('MINIO_ENDPOINT'),
      port: 9000,
      useSSL: Boolean(this.configService.get('MINIO_USE_SSL')),
      accessKey: this.configService.get('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get('MINIO_SECRET_KEY'),
    });
  }

  async generatePresignedUrl(
    bucketName: string,
    objectName: string,
    expirySeconds: number,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      this.minioClient.presignedPutObject(
        bucketName,
        objectName,
        expirySeconds,
        (err, presignedUrl) => {
          if (err) {
            reject(err);
          } else {
            resolve(presignedUrl);
          }
        },
      );
    });
  }

  async generatePresignedGetUrl(
    bucketName: string,
    objectName: string,
    expirySeconds: number,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      this.minioClient.presignedGetObject(
        bucketName,
        objectName,
        expirySeconds,
        (err, presignedUrl) => {
          if (err) reject(err);
          else {
            resolve(presignedUrl);
          }
        },
      );
    });
  }
}
