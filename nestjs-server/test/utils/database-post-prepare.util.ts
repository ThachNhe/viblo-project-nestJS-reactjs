import { Injectable, Body } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as argon2 from 'argon2';
import { Tag } from '../../src/entity';
export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

@Injectable()
export class PostDatabasePrepareUtil {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async prepare(): Promise<void> {
    // Xóa dữ liệu cũ
    let userId1 = 0;
    let userId2 = 0;

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

    const user1 = await this.dataSource
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
      ])
      .execute();

    const user2 = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('users')
      .values([
        {
          userName: 'thachdinh2',
          email: 'thachdinh2@gmail.com',
          password: hashedPassword,
          fullName: 'Test User',
          roles: Role.Admin,
        },
      ])
      .execute();

    userId1 = user1.identifiers[0].id;
    userId2 = user2.identifiers[0].id;

    // Tạo tag mới
    const insertedTags = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('tags')
      .values([
        { name: 'nestjs', description: 'Nestjs' },
        { name: 'testing', description: 'Testing' },
        { name: 'JDK', description: 'Java Development Kit' },
        { name: 'JVM', description: 'Java Virtual-machine' },
      ])
      .returning('*')
      .execute();

    const tags = insertedTags.generatedMaps as Tag[];

    // console.log('tags', tags);

    // Lấy đối tượng User từ bảng users
    const userRes1 = await this.dataSource
      .createQueryBuilder()
      .select('user')
      .from('users', 'user')
      .where('user.id = :id', { id: userId1 })
      .getOne();

    const userRes2 = await this.dataSource
      .createQueryBuilder()
      .select('user')
      .from('users', 'user')
      .where('user.id = :id', { id: userId2 })
      .getOne();

    // Tạo post mới
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('posts')
      .values([
        {
          title: 'First Post',
          content_markdown: 'This is the content for the first post.',
          tags_array: ['nestjs', 'testing'],
          tags: tags,
          view_number: 0,
          vote_number: 0,
          bookmark_number: 0,
          comment_number: 0,
          isPublished: true,
          seriesId: null,
          created_at: new Date(),
          updated_at: new Date(),
          author: userRes1, // Author ID đã có trong bảng `users`
        },
        {
          title: 'Second Post',
          content_markdown: 'This is the content for the second post.',
          tags_array: ['nestjs'],
          tags: tags,
          view_number: 0,
          vote_number: 0,
          bookmark_number: 0,
          comment_number: 0,
          isPublished: false,
          seriesId: 1, // Ví dụ, bài viết thuộc một series
          created_at: new Date(),
          updated_at: new Date(),
          author: userRes2, // Author ID đã có trong bảng `users`
        },
      ])
      .execute();
  }
}
