import { TagService } from './tag.service';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TagDTO, TagNameDTO } from './dto/tag.dto';
import { Roles } from 'src/auth/strategy/roles.decorator';
import { Role } from 'src/enums';
import { AuthGuard } from '@nestjs/passport';

@Controller('tags')
export class TagController {
  constructor(private TagService: TagService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  createTag(@Body() body: TagDTO) {
    return this.TagService.create(body);
  }

  @Get('all')
  getTags() {
    return this.TagService.getTags();
  }

  @Get('search')
  @UseGuards(AuthGuard('jwt'))
  searchTags(@Query('keyword') keyword: string) {
    if (!keyword) {
      throw new Error('Keyword is required');
    }
    return this.TagService.searchTags(keyword);
  }

  @Get('exist')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  isExist(@Query() query: TagNameDTO) {
    if (!query.name) {
      throw new Error('tagName is required');
    }
    return this.TagService.isExist(query);
  }
}
