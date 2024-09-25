import { Injectable, Body } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as argon2 from 'argon2';
import { Tag, Post } from '../../src/entity';

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

@Injectable()
export class UserDbPrepareUtil {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async prepare(): Promise<void> {
    // Xóa dữ liệu cũ
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from('user_votes')
      .execute();
    await this.dataSource.createQueryBuilder().delete().from('posts').execute();
    await this.dataSource.createQueryBuilder().delete().from('tags').execute();
    await this.dataSource.createQueryBuilder().delete().from('users').execute();

    // Tạo user mới
    const hashedPassword = await argon2.hash('123');

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('users')
      .values([
        {
          userName: 'thachdinh',
          email: 'thachdinh@gmail.com',
          password: hashedPassword,
          fullName: 'Test User',
          roles: Role.Admin,
        },
        {
          userName: 'khanhtran',
          email: 'khanhtran@gmail.com',
          password: hashedPassword,
          fullName: 'Tran Khanh',
          roles: Role.User,
        },
        {
          userName: 'hoanganh',
          email: 'hoanganh@gmail.com',
          password: hashedPassword,
          fullName: 'Hoang Anh',
          roles: Role.User,
        },
      ])
      .execute();
  }
}
