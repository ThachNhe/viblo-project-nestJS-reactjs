import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post, Tag, UserPost, User } from '../entity/index';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag, UserPost, User])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
