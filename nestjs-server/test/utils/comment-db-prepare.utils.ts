import { Injectable, Body } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as argon2 from 'argon2';

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

@Injectable()
export class CommentDbPrepareUtil {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async prepare(): Promise<void> {
    // Xóa dữ liệu cũ
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from('comments')
      .execute();
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from('post_tags')
      .execute();
    await this.dataSource.createQueryBuilder().delete().from('tags').execute();
    await this.dataSource.createQueryBuilder().delete().from('posts').execute();
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
          roles: Role.User,
        },
        {
          email: 'dieuvy@gmail.com',
          userName: 'dieuvy',
          fullName: 'Dieu Vy',
          password: await argon2.hash('123'),
          roles: Role.User,
        },
      ])
      .execute();

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('tags')
      .values([
        {
          name: 'nestjs',
          description: 'NestJS',
        },
        {
          name: 'react.js',
          description: 'ReactJS',
        },
      ])
      .execute();
  }
}
