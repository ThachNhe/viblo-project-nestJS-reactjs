import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {
  Answer,
  Comment,
  Notification,
  NotificationDetail,
  Post,
  Question,
  Series,
  Tag,
  User,
  UserPost,
} from './entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5435,
  username: 'root',
  password: '123',
  database: 'testdb',
  synchronize: true,
  logging: false,
  entities: [
    User,
    Post,
    Comment,
    Series,
    Question,
    Answer,
    Tag,
    Notification,
    NotificationDetail,
    UserPost,
  ],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(async () => {})
  .catch((error) => console.log(error));
