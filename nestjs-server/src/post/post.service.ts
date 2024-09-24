import { Injectable, NotFoundException } from '@nestjs/common';
import { PostDTO } from './dto/post.dto';
import { AppDataSource } from '../index';
import { Post, User, Tag, UserPost } from '../entity';
import { formatVietnameseDate } from '../utils/common.function';
import { PaginationDto } from './dto/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,

    @InjectRepository(UserPost)
    private userPostRepository: Repository<UserPost>,
  ) {}
  async create(body: PostDTO, userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const tags = await Promise.all(
      body?.tagArray?.map(async (name) => {
        let tag = await this.tagRepository.findOne({ where: { name } });
        return tag;
      }),
    );

    const post = new Post();
    post.title = body.title;
    post.content_markdown = body.contentMarkdown;
    post.tags_array = tags.map((tag) => tag.name);
    post.author = user;
    post.tags = tags;
    await this.postRepository.save(post);

    await this.userRepository
      .createQueryBuilder('user')
      .update(User)
      .set({ post_number: () => 'post_number + 1' })
      .where('id = :id', { id: userId })
      .execute();

    delete post.author;

    delete post.tags;

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: post,
    };
  }

  async vote(postId: any, userId: any, voteType: 'UPVOTE' | 'DOWNVOTE') {
    const post = await this.postRepository.findOne({
      where: { id: +postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: +userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let userPost = await this.userPostRepository.findOne({
      where: { user: { id: +userId }, post: { id: +postId } },
    });

    if (userPost) {
      if (userPost?.voteType === voteType) {
        if (voteType === 'UPVOTE') {
          await this.postRepository
            .createQueryBuilder()
            .update(Post)
            .set({ vote_number: () => 'vote_number - 1' })
            .where('id = :id', { id: postId })
            .execute();
          await this.userPostRepository.remove(userPost);
        }

        if (voteType === 'DOWNVOTE') {
          await this.postRepository
            .createQueryBuilder()
            .update(Post)
            .set({ vote_number: () => 'vote_number + 1' })
            .where('id = :id', { id: postId })
            .execute();
          await this.userPostRepository.remove(userPost);
        }
      } else {
        if (voteType === 'UPVOTE') {
          await this.postRepository
            .createQueryBuilder()
            .update(Post)
            .set({ vote_number: () => 'vote_number + 2' })
            .where('id = :id', { id: postId })
            .execute();

          await this.userPostRepository.save({
            ...userPost,
            voteType,
          });
        }

        if (voteType === 'DOWNVOTE') {
          await this.postRepository
            .createQueryBuilder()
            .update(Post)
            .set({ vote_number: () => 'vote_number - 2' })
            .where('id = :id', { id: postId })
            .execute();

          await this.userPostRepository.save({
            ...userPost,
            voteType,
          });
        }
      }
    } else {
      const newUserPost = new UserPost();
      newUserPost.user = user;
      newUserPost.post = post;
      newUserPost.voteType = voteType;

      await this.userPostRepository.save(newUserPost);
      await this.postRepository.save(post);

      await this.postRepository
        .createQueryBuilder()
        .update(Post)
        .set({
          vote_number:
            voteType === 'UPVOTE'
              ? () => 'vote_number + 1'
              : () => 'vote_number - 1',
        })
        .where('id = :id', { id: postId })
        .execute();
    }

    const newPost = await this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id: postId })
      .getOne();
    // console.log(newPost);
    delete newPost.comments;

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: newPost,
    };
  }

  async getId(id: number) {
    const post = await this.postRepository
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

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    delete post?.author?.password;
    delete post?.author?.email;
    delete post?.author?.posts;

    // post.view_number += 1;
    await this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ view_number: () => 'view_number + 1' })
      .where('id = :id', { id })
      .execute();

    await this.postRepository.save(post);

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

  async bookmark(postId: number, userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = await this.postRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.bookmarkers = [user];

    await this.postRepository.save(post);
    await this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ bookmark_number: () => 'bookmark_number + 1' })
      .where('id = :id', { id: postId })
      .execute();

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: 'Bookmark successfully',
    };
  }

  async deleteBookmark(postId: number, userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: +userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = await this.postRepository.findOne({
      relations: ['bookmarkers'],
      where: { id: +postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.bookmarkers = post.bookmarkers.filter((item) => item.id !== userId);

    await this.postRepository.save(post);

    await this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ bookmark_number: () => 'bookmark_number - 1' })
      .where('id = :id', { id: postId })
      .execute();

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: 'UnBookmark successfully',
    };
  }

  async getPaginationPosts(paginationDto: PaginationDto) {
    const postRepository = AppDataSource.getRepository(Post);
    const { page = 1, limit = 10 } = paginationDto;
    console.log(page, limit);
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

    if (!result) {
      throw new NotFoundException('Post not found');
    }

    const newResult = result?.map((item) => {
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

  // async getRelatedPosts(postId: number) {
  //   // Lấy các bài viết liên quan theo tag
  //   const post = await this.postRepository.findOne({ where: { id: postId } });

  //   if (!post) {
  //     throw new NotFoundException('Post not found');
  //   }
  //   const relatedPosts = await this.postRepository
  //     .createQueryBuilder('post')
  //     .innerJoin('post.tags', 'tag') // Kết nối với bảng tags
  //     .leftJoin('post.author', 'author')
  //     .addSelect([
  //       'author.id',
  //       'author.userName',
  //       'author.fullName',
  //       'author.avatar',
  //     ])
  //     .where('post.id != :postId', { postId }) // Loại trừ bài viết hiện tại
  //     .andWhere((qb) => {
  //       const subQuery = qb
  //         .subQuery()
  //         .select('tag.id')
  //         .from(Post, 'p')
  //         .innerJoin('p.tags', 't')
  //         .where('p.id = :postId')
  //         .getQuery();
  //       return 'tag.id IN ' + subQuery; // Kiểm tra xem tag có nằm trong subQuery không
  //     })
  //     .getMany();

  //   const newResult = relatedPosts?.map((item, index) => {
  //     return {
  //       ...item,
  //       created_at: formatVietnameseDate(`${item.created_at}`),
  //     };
  //   });
  //   return {
  //     success: true,
  //     statusCode: 200,
  //     error: null,
  //     data: newResult,
  //   };
  // }

  async getRelatedPosts(postId: number): Promise<Post[]> {
    // Lấy bài viết hiện tại và các tags của nó
    const currentPost = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['tags'],
    });

    if (!currentPost) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    console.log('currentPost', currentPost);

    // Lấy danh sách tag ids từ bài viết hiện tại
    const tagIds = currentPost.tags.map((tag) => tag.id);

    console.log('tagIds : ', tagIds);

    // Tìm các bài viết khác có ít nhất 1 tag trùng
    const relatedPosts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tag')
      .where('tag.id IN (:...tagIds)', { tagIds })
      .andWhere('post.id != :postId', { postId }) // Loại trừ bài viết hiện tại
      .orderBy('post.created_at', 'DESC') // Có thể sắp xếp theo thời gian tạo
      .getMany();

    return relatedPosts;
  }
}
