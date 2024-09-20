import { AppDataSource } from './../src/index';
export enum Role {
  User = 'User',
  Admin = 'Admin',
}

import { User, Post, Tag } from '../src/entity/index';

export const AuthTestSeedData = async () => {
  const userRepo = AppDataSource.getRepository(User);
  const user1 = userRepo.create({
    fullName: 'John Doe',
    userName: 'john_doe',
    email: 'john@example.com',
    password: '123',
    avatar: 'http://example.com/avatar1.png',
  });

  const user2 = userRepo.create({
    fullName: 'Jane Smith',
    userName: 'jane_smith',
    email: 'jane@example.com',
    password: '123',
    avatar: 'http://example.com/avatar2.png',
  });

  await userRepo.save([user1, user2]);

  await userRepo.save(user1);
};
