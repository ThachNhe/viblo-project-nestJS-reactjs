import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as argon2 from 'argon2';

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

@Injectable()
export class StatisticDbPrepareUtil {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async prepare(): Promise<void> {
    // Xóa dữ liệu cũ
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from('user_votes')
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
          roles: Role.Admin,
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
        {
          name: 'JDK',
          description: 'Java Development Kit',
        },
        {
          name: 'Java',
          description: 'Java',
        },
        {
          name: 'Spring',
          description: 'Spring Framework',
        },
        {
          name: 'Spring Boot',
          description: 'Spring Boot',
        },
      ])
      .execute();

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('posts')
      .values([
        {
          title: 'First Post',
          content_markdown: 'This is the content for the first post.',
          tags: [],
          view_number: 0,
          vote_number: 0,
          bookmark_number: 0,
          comment_number: 0,
          isPublished: true,
          seriesId: null,
          slug: 'first-post',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .execute();
  }
}
