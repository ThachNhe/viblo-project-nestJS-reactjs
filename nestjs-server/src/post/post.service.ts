import { Injectable, Body, NotFoundException } from '@nestjs/common';
import { PostDTO } from './dto/post.dto';
import { AppDataSource } from '../index';
import { Post, User, Tag } from '../entity';
import { formatVietnameseDate } from '../utils/common.function';
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

  async getId(id: any) {
    console.log('id', id);
    const postRepository = AppDataSource.getRepository(Post);
    const post = await postRepository.findOne({
      where: { id: +id },
      relations: ['author'],
    });

    delete post?.author?.password;
    delete post?.author?.email;
    delete post?.author?.posts;

    post.view_number += 1;
    await postRepository.save(post);

    const updatedPost = {
      ...post,
      createdDate: formatVietnameseDate(`${post.created_at}`),
    };
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: updatedPost,
    };
  }
}
