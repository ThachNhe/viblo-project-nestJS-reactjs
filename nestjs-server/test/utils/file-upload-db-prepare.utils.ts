import { Injectable, Body } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

@Injectable()
export class FileUploadDbPrepareUtil {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async prepare(): Promise<void> {}
}
