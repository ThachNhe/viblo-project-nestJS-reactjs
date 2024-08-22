import { Injectable, Body } from '@nestjs/common';
import { PostDTO } from './dto/post.dto';
import { AppDataSource } from '../index';
import { Post } from '../entity/Post';
@Injectable()
export class PostService {
  async createPost(body: PostDTO) {
    const userRepository = AppDataSource.getRepository(Post);
    const post = new Post();
    post.title = body.title;
    post.content_markdown = body.contentMarkdown;
    post.tags_array = body?.tagArray;

    // post.author = body.authorId;
    await userRepository.save(post);
    return post;
  }
}
