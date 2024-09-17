import { TagService } from './tag.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TagDTO, TagNameDTO } from './dto/tag.dto';

@Controller('tags')
export class TagController {
  constructor(private TagService: TagService) {}

  @Post()
  createTag(@Body() body: TagDTO) {
    return this.TagService.create(body);
  }

  @Get('all')
  getTags() {
    return this.TagService.getTags();
  }

  @Get('search')
  searchTags(@Query('keyword') keyword: string) {
    if (!keyword) {
      throw new Error('Keyword is required');
    }
    return this.TagService.searchTags(keyword);
  }

  @Get('exist')
  isExist(@Query() query: TagNameDTO) {
    if (!query.name) {
      throw new Error('tagName is required');
    }
    return this.TagService.isExist(query);
  }
}
