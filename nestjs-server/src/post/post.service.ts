import { Injectable, NotFoundException } from '@nestjs/common';
import { PostDTO } from './dto/post.dto';
import { AppDataSource } from '../index';
import { Post, User, Tag, UserPost } from '../entity';
import { formatVietnameseDate } from '../utils/common.function';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PostService {
  constructor() {}
  async createPost(body: PostDTO, userId: number) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const tagRepository = AppDataSource.getRepository(Tag);

    const tags = await Promise.all(
      body?.tagArray?.map(async (name) => {
        let tag = await tagRepository.findOne({ where: { name } });

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

    userRepository
      .createQueryBuilder()
      .update(User)
      .set({ post_number: () => 'post_number + 1' })
      .where('id = :id', { id: userId })
      .execute();

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

    if (userPost) {
      if (userPost?.voteType === voteType) {
        if (voteType === 'UPVOTE') {
          // post.vote_number -= 1;
          postRepository
            .createQueryBuilder()
            .update(Post)
            .set({ vote_number: () => 'vote_number - 1' })
            .where('id = :id', { id: postId })
            .execute();

          await userPostRepository.remove(userPost);
        }

        if (voteType === 'DOWNVOTE') {
          // post.vote_number += 1;
          postRepository
            .createQueryBuilder()
            .update(Post)
            .set({ vote_number: () => 'vote_number + 1' })
            .where('id = :id', { id: postId })
            .execute();
          await userPostRepository.remove(userPost);
        }
      } else {
        if (voteType === 'UPVOTE') {
          // post.vote_number += 2;
          postRepository
            .createQueryBuilder()
            .update(Post)
            .set({ vote_number: () => 'vote_number + 2' })
            .where('id = :id', { id: postId })
            .execute();

          userPostRepository.save({
            ...userPost,
            voteType,
          });
        }

        if (voteType === 'DOWNVOTE') {
          postRepository
            .createQueryBuilder()
            .update(Post)
            .set({ vote_number: () => 'vote_number - 2' })
            .where('id = :id', { id: postId })
            .execute();
          userPostRepository.save({
            ...userPost,
            voteType,
          });
        }

        await postRepository.save(post);
      }
    } else {
      post.vote_number =
        voteType === 'DOWNVOTE' ? post.vote_number - 1 : post.vote_number + 1;

      const newUserPost = new UserPost();
      newUserPost.user = user;
      newUserPost.post = post;
      newUserPost.voteType = voteType;

      await userPostRepository.save(newUserPost);
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

  async getId(id: number) {
    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.userVotes', 'userVote') // Nối với bảng userVotes
      .leftJoin('userVote.user', 'user') // Nối với bảng user nhưng không lấy toàn bộ
      .addSelect(['user.id']) // Chỉ lấy trường user.id
      .leftJoinAndSelect('post.comments', 'comments') // Nối với bảng comments để lấy tất cả comments
      .leftJoinAndSelect('post.author', 'author')
      .leftJoin('post.bookmarkers', 'bookmarkers')
      .addSelect(['bookmarkers.id'])
      .where('post.id = :id', { id })
      .getOne();

    delete post?.author?.password;
    delete post?.author?.email;
    delete post?.author?.posts;

    // post.view_number += 1;
    postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ view_number: () => 'view_number + 1' })
      .where('id = :id', { id })
      .execute();

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

  async getRadomId() {
    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.userVotes', 'userVote') // Nối với bảng userVotes
      .leftJoin('userVote.user', 'user') // Nối với bảng user nhưng không lấy toàn bộ
      .addSelect(['user.id']) // Chỉ lấy trường user.id
      .leftJoinAndSelect('post.comments', 'comments') // Nối với bảng comments để lấy tất cả comments
      .leftJoinAndSelect('post.author', 'author')
      .leftJoin('post.bookmarkers', 'bookmarkers')
      .addSelect(['bookmarkers.id'])
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();

    delete post?.author?.password;
    delete post?.author?.email;
    delete post?.author?.posts;

    // post.view_number += 1;
    const id = post?.id;

    postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ view_number: () => 'view_number + 1' })
      .where('id = :id', { id })
      .execute();
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

  async bookmarkService(postId: number, userId: number) {
    const postRepository = AppDataSource.getRepository(Post);
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = await postRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.bookmarkers = [user];

    postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ bookmark_number: () => 'bookmark_number + 1' })
      .where('id = :id', { id: postId })
      .execute();

    await postRepository.save(post);

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: user,
    };
  }

  async deleteBookmark(postId: number, userId: number) {
    const postRepository = AppDataSource.getRepository(Post);
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id: +userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = await postRepository.findOne({
      relations: ['bookmarkers'],
      where: { id: +postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.bookmarkers = post.bookmarkers.filter((item) => item.id !== userId);

    await postRepository.save(post);

    postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ bookmark_number: () => 'bookmark_number - 1' })
      .where('id = :id', { id: postId })
      .execute();

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: null,
    };
  }

  async getPaginationPosts(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const postRepository = AppDataSource.getRepository(Post);

    const [result, total] = await postRepository
      .createQueryBuilder('post')
      .leftJoin('post.author', 'author')
      .addSelect([
        'author.id',
        'author.userName',
        'author.fullName',
        'author.avatar',
      ])
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();

    const newResult = result?.map((item, index) => {
      return {
        ...item,
        created_at: formatVietnameseDate(`${item.created_at}`),
      };
    });

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: newResult,
      meta: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: +page,
        pageSize: +limit,
      },
    };
  }

  async getRelatedPosts(postId: number) {
    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const tags = post.tags_array;
    console.log(postId);
    console.log(tags);
    if (!tags || tags.length === 0) {
      return {
        success: true,
        statusCode: 200,
        error: null,
        data: [],
      };
    }

    const relatedPosts = await postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tags')
      .leftJoin('post.author', 'author')
      .addSelect([
        'author.id',
        'author.userName',
        'author.fullName',
        'author.avatar',
      ])
      .where('tags.name IN (:...tags)', { tags })
      .andWhere('post.id != :postId', { postId })
      .getMany();

    const newResult = relatedPosts?.map((item, index) => {
      return {
        ...item,
        created_at: formatVietnameseDate(`${item.created_at}`),
      };
    });
    return {
      success: true,
      statusCode: 200,
      error: null,
      data: newResult,
    };
  }
}
