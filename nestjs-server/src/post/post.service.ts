import {
  Injectable,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PostDTO } from './dto/post.dto';
import { AppDataSource } from '../index';
import { Post, User, Tag, UserPost } from '../entity';
import { formatVietnameseDate } from '../utils/common.function';
import { de } from 'date-fns/locale';
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

  async vote(postId: any, userId: any, voteType: 'upvote' | 'downvote') {
    const postRepository = AppDataSource.getRepository(Post);
    const userPostRepository = AppDataSource.getRepository(UserPost);

    const post = await postRepository.findOne({
      where: { id: +postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: +userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let userPost = await userPostRepository.findOne({
      where: { user: { id: +userId }, post: { id: +postId } },
    });

    // if post is already voted by user
    if (userPost) {
      if (userPost?.voteType === voteType) {
        throw new BadRequestException(
          `You have already ${voteType}d this post`,
        );
      } else {
        if (voteType === 'upvote') {
          post.vote_number += 2;
          userPostRepository.save({
            ...userPost,
            voteType,
          });
        }

        if (voteType === 'downvote') {
          post.vote_number -= 2;
          userPostRepository.save({
            ...userPost,
            voteType,
          });
        }

        await postRepository.save(post);
      }
    } else {
      post.vote_number =
        voteType === 'downvote' ? post.vote_number - 1 : post.vote_number + 1;
      userPost = userPostRepository.create({ user, post, voteType });
      await userPostRepository.save(userPost);
      await postRepository.save(post);
    }
    delete post.comments;
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
