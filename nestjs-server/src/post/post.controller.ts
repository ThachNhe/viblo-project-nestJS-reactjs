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
import { PostDTO } from './dto/post.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly PostService: PostService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: PostDTO, @Request() req: any) {
    const userId = req.user.userId;
    return this.PostService.createPost(body, userId);
  }

  @Get(':id')
  getId(@Param('id') postId: any) {
    return postId
      ? this.PostService.getId(postId)
      : this.PostService.getRadomId();
  }

  @Post(':id/vote')
  @UseGuards(AuthGuard('jwt'))
  vote(@Body() body: any, @Param('id') postId: number, @Request() req: any) {
    const userId = req.user.userId;
    return this.PostService.vote(postId, userId, body.voteType);
  }

  @Post(':id/bookmark')
  @UseGuards(AuthGuard('jwt'))
  bookmark(@Request() req: any, @Param('id') postId: number) {
    const userId = req.user.userId;
    return this.PostService.bookmarkService(postId, userId);
  }

  @Delete(':id/bookmark')
  @UseGuards(AuthGuard('jwt'))
  deleteBookmark(@Request() req: any, @Param('id') postId: number) {
    const userId = req.user.userId;
    return this.PostService.deleteBookmark(postId, userId);
  }

  @Get()
  async getPaginationPosts(@Query() query: PaginationDto) {
    return this.PostService.getPaginationPosts(query);
  }

  @Get(':id/related')
  async getRelatedPosts(@Param('id') postId: number) {
    return this.PostService.getRelatedPosts(postId);
  }
}
