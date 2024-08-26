import { Injectable, Body } from '@nestjs/common';
import { PostDTO } from './dto/post.dto';
import { AppDataSource } from '../index';
import { Post, User, Tag } from '../entity';
@Injectable()
export class PostService {
  constructor() {}
  async createPost(body: PostDTO) {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: body.authorId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const tagRepository = AppDataSource.getRepository(Tag);

    const tags = await Promise.all(
      body?.tagArray?.map(async (name) => {
        let tag = await tagRepository.findOne({ where: { name } });
        if (!tag) {
          tag = tagRepository.create({ name });
          await tagRepository.save(tag);
        }
        return tag;
      }),
    );

    const postRepository = AppDataSource.getRepository(Post);
    const post = new Post();
    post.title = body.title;
    post.content_markdown = body.contentMarkdown;
    post.tags_array = tags.map((tag) => tag.name);
    post.author = user;
    post.tags = tags;
    await postRepository.save(post);

    delete post.author;

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: post,
    };
  }
}
