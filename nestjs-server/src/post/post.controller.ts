import { PostService } from './post.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostDTO, PostIdDTO, VoteDTO, SlugDTO } from './dto/post.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  BookmarkResponseDto,
  CreatedPostApiResponseDto,
  GetPostIdApiResponseDto,
  GotPostsApiResponseDto,
  PostVoteApiResponseDto,
  UnbookmarkResponseDto,
} from './dto/post-response.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly PostService: PostService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CreatedPostApiResponseDto })
  create(@Body() body: PostDTO, @Request() req: any) {
    const userId = req.user.userId;
    return this.PostService.create(body, userId);
  }

  @Get(':postId')
  @ApiOkResponse({ type: GetPostIdApiResponseDto })
  getId(@Param() params: PostIdDTO) {
    return this.PostService.getId(params.postId);
  }

  @Get('slug/:slug')
  @ApiOkResponse({ type: GetPostIdApiResponseDto })
  getBySlug(@Param() params: SlugDTO) {
    return this.PostService.getBySlug(params.slug);
  }

  @Post(':postId/vote')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: PostVoteApiResponseDto })
  vote(@Body() body: VoteDTO, @Param() params: PostIdDTO, @Request() req: any) {
    const userId = req.user.userId;
    return this.PostService.vote(params.postId, userId, body.voteType);
  }

  @Post(':postId/bookmark')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: BookmarkResponseDto })
  bookmark(@Request() req: any, @Param() params: PostIdDTO) {
    const userId = req.user.userId;
    return this.PostService.bookmark(params.postId, userId);
  }

  @Delete(':postId/bookmark')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UnbookmarkResponseDto })
  deleteBookmark(@Request() req: any, @Param() params: PostIdDTO) {
    const userId = req.user.userId;
    return this.PostService.deleteBookmark(params.postId, userId);
  }

  @Get()
  @ApiOkResponse({ type: GotPostsApiResponseDto })
  async getPaginationPosts(@Query() query: PaginationDto) {
    return this.PostService.getPaginationPosts(query);
  }

  @Get(':postId/related')
  async getRelatedPosts(@Param() params: PostIdDTO) {
    return this.PostService.getRelatedPosts(params.postId);
  }
}
