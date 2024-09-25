import { TagService } from './tag.service';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { KeywordDTO, TagDTO, TagNameDTO } from './dto/tag.dto';
import { Roles } from '../auth/strategy/roles.decorator';
import { Role } from '../enums';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';

import {
  ExistTagCheckApiResponseDTO,
  SearchResponseDTO,
  TagResponseDto,
} from './dto/tag-response.dto';

@Controller('tags')
export class TagController {
  constructor(private TagService: TagService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  @ApiOkResponse({ type: TagResponseDto })
  createTag(@Body() body: TagDTO) {
    return this.TagService.create(body);
  }

  @Get('all')
  getTags() {
    return this.TagService.getTags();
  }

  @Get('search')
  @ApiOkResponse({ type: SearchResponseDTO })
  @UseGuards(AuthGuard('jwt'))
  searchTags(@Query() query: KeywordDTO) {
    return this.TagService.searchTags(query.keyword);
  }

  @Get('exist')
  @ApiOkResponse({ type: ExistTagCheckApiResponseDTO })
  @UseGuards(AuthGuard('jwt'))
  isExist(@Query() query: TagNameDTO) {
    if (!query.name) {
      throw new Error('tagName is required');
    }
    return this.TagService.isExist(query);
  }
}
