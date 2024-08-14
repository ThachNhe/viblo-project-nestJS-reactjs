import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
@Injectable()
export class FileUploadService {
  public configService: ConfigService;
  private readonly minioClient: Minio.Client;
  constructor() {
    // this.minioClient = new Minio.Client({
    //   endPoint: configService.get('MINIO_ENDPOINT'),
    //   port: 9000,
    //   useSSL: configService.get('MINIO_USE_SSL'),
    //   accessKey: configService.get('MINIO_ACCESS_KEY'),
    //   secretKey: configService.get('MINIO_SECRET_KEY'),
    // });

    this.minioClient = new Minio.Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'AKIAIOSFODNN7EXAMPLE',
      secretKey: 'wJalrXUtnFEMIK7MDENGbPxRfiCYEXAMPLEKEY',
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
