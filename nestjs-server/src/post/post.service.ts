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

  async vote(postId: any, userId: any, voteType: 'UPVOTE' | 'DOWNVOTE') {
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

    await AppDataSource.transaction(async (transactionalEntityManager) => {
      if (userPost) {
        if (userPost?.voteType === voteType) {
          if (voteType === 'UPVOTE') {
            post.vote_number -= 1;
            await transactionalEntityManager.remove(UserPost, userPost);
            await transactionalEntityManager.save(Post, post);
          }

          if (voteType === 'DOWNVOTE') {
            post.vote_number += 1;
            await transactionalEntityManager.remove(UserPost, userPost);
            await transactionalEntityManager.save(Post, post);
          }
        } else {
          if (voteType === 'UPVOTE') {
            post.vote_number += 2;
            transactionalEntityManager.save(UserPost, {
              ...userPost,
              voteType,
            });
          }

          if (voteType === 'DOWNVOTE') {
            post.vote_number -= 2;
            transactionalEntityManager.save(UserPost, {
              ...userPost,
              voteType,
            });
          }

          await transactionalEntityManager.save(Post, post);
        }
      } else {
        post.vote_number =
          voteType === 'DOWNVOTE' ? post.vote_number - 1 : post.vote_number + 1;

        const newUserPost = new UserPost();
        newUserPost.user = user;
        newUserPost.post = post;
        newUserPost.voteType = voteType;

        await transactionalEntityManager.save(UserPost, newUserPost);
        await transactionalEntityManager.save(Post, post);
      }
    });

    delete post.comments;

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: post,
    };
  }

  async getId(id: any) {
    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.userVotes', 'userVote') // Nối với bảng userVotes
      .leftJoin('userVote.user', 'user') // Nối với bảng user nhưng không lấy toàn bộ
      .addSelect(['user.id']) // Chỉ lấy trường user.id
      .leftJoinAndSelect('post.comments', 'comments') // Nối với bảng comments để lấy tất cả comments
      .where('post.id = :id', { id })
      .getOne();

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
