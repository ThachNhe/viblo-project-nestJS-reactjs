import { Injectable } from '@nestjs/common';
import { Post, Tag, User, Comment } from '../entity';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async getStatistics() {
    const tagNumber = await this.tagRepository.count();
    const postNumber = await this.postRepository.count();

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: {
        tagNumber,
        postNumber,
      },
    };
  }

  async commonStatistic() {
    const tagNumber = await this.tagRepository.count();
    const postNumber = await this.postRepository.count();
    const userNumber = await this.userRepository.count();
    const commentNumber = await this.commentRepository.count();
    const viewNumber = await this.postRepository.sum('view_number');

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: {
        tagNumber,
        postNumber,
        userNumber,
        commentNumber,
        viewNumber,
      },
    };
  }
}
