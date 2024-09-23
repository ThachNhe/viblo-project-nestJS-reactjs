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
import { PostDTO, PostIdDTO, VoteDTO } from './dto/post.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly PostService: PostService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: PostDTO, @Request() req: any) {
    const userId = req.user.userId;
    return this.PostService.create(body, userId);
  }

  @Get(':postId')
  getId(@Param() params: PostIdDTO) {
    return this.PostService.getId(params.postId);
  }

  @Post(':postId/vote')
  @UseGuards(AuthGuard('jwt'))
  vote(@Body() body: VoteDTO, @Param() params: PostIdDTO, @Request() req: any) {
    const userId = req.user.userId;
    return this.PostService.vote(params.postId, userId, body.voteType);
  }

  @Post(':postId/bookmark')
  @UseGuards(AuthGuard('jwt'))
  bookmark(@Request() req: any, @Param() params: PostIdDTO) {
    const userId = req.user.userId;
    return this.PostService.bookmarkService(params.postId, userId);
  }

  @Delete(':postId/bookmark')
  @UseGuards(AuthGuard('jwt'))
  deleteBookmark(@Request() req: any, @Param() params: PostIdDTO) {
    const userId = req.user.userId;
    console.log('userId', userId);
    return this.PostService.deleteBookmark(params.postId, userId);
  }

  @Get()
  async getPaginationPosts(@Query() query: PaginationDto) {
    return this.PostService.getPaginationPosts(query);
  }

  @Get(':postId/related')
  async getRelatedPosts(@Param() params: PostIdDTO) {
    return this.PostService.getRelatedPosts(params.postId);
  }
}
