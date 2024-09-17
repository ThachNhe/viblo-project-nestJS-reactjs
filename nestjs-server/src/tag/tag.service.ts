import { Injectable, NotFoundException } from '@nestjs/common';
import { AppDataSource } from '../index';
import { Tag } from '../entity';
import { TagDTO } from './dto/tag.dto';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(body: TagDTO) {
    const tag = new Tag();
    tag.name = body.name;
    tag.description = body.description;

    await this.tagRepository.save(tag);
    return {
      tag,
    };
  }

  async getTags() {
    const tag = this.tagRepository.find();

    if (!tag) {
      throw new NotFoundException();
    }

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: tag,
    };
  }

  async searchTags(keyword: string) {
    const tags = await this.tagRepository
      .createQueryBuilder('tag')
      .where('tag.name like :keyword', { keyword: `%${keyword}%` })
      .getMany();

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: tags,
    };
  }
}
