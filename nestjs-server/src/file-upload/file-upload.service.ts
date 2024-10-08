import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
@Injectable()
export class FileUploadService {
  private readonly minioClient: Minio.Client;

  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      // endPoint: 'minio',
      endPoint: 'localhost',
      port: +this.configService.get('MINIO_PORT'),
      useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
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
            const localUrl = presignedUrl.replace(
              'http://minio',
              'http://localhost',
            );
            console.log('localUrl', localUrl);
            console.log('presignedUrl1', presignedUrl);
            // resolve(localUrl);
            resolve(localUrl);
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
            // const localUrl = presignedUrl.replace(
            //   'http://minio',
            //   'http://localhost',
            // );
            // console.log('localUrl', localUrl);
            // resolve(localUrl);
            resolve(presignedUrl);
          }
        },
      );
    });
  }
}
