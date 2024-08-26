import { TagService } from './tag.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagDTO } from './dto/tag.dto';

@Controller('tag')
export class TagController {
  constructor(private TagService: TagService) {}

  @Post()
  createTag(@Body() body: TagDTO) {
    return this.TagService.createTag(body);
  }

  @Get('all')
  getTags() {
    return this.TagService.getTags();
  }
}
