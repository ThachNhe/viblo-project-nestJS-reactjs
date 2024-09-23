import { Injectable, Body } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as argon2 from 'argon2';
export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

@Injectable()
export class PostDatabasePrepareUtil {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async prepare(): Promise<void> {
    // Xóa dữ liệu cũ
    await this.dataSource.createQueryBuilder().delete().from('posts').execute();
    await this.dataSource.createQueryBuilder().delete().from('tags').execute();
    await this.dataSource.createQueryBuilder().delete().from('users').execute();
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from('user_votes')
      .execute();

    // Tạo user mới
    const hashedPassword = await argon2.hash('123');

    const user = await this.dataSource
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

    // Tạo tag mới
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('tags')
      .values([
        { name: 'nestjs', description: 'Nestjs' },
        { name: 'testing', description: 'Testing' },
      ])
      .execute();
  }
}
