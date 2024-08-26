import { Injectable, NotFoundException } from '@nestjs/common';
import { AppDataSource } from '../index';
import { Tag } from '../entity';
import { TagDTO } from './dto/tag.dto';
import { error } from 'console';

@Injectable()
export class TagService {
  async createTag(body: TagDTO) {
    const tagRepository = AppDataSource.getRepository(Tag);
    const tag = new Tag();
    tag.name = body.name;
    await tagRepository.save(tag);
    return {
      tag,
    };
  }

  async getTags() {
    const tag = await AppDataSource.getRepository(Tag).find();

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
}
