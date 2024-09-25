import * as argon2 from 'argon2';

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthDbPrepareUtil {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async prepare(): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from('user_votes')
      .execute();

    await this.dataSource.createQueryBuilder().delete().from('users').execute();
    const hashedPassword = await argon2.hash('123');

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('users')
      .values([
        {
          userName: 'newUser',
          email: 'newuser@example.com',
          password: hashedPassword,
          fullName: 'New User',
        },
      ])
      .execute();
  }
}
