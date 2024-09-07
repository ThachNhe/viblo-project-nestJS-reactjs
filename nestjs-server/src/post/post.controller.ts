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
@Controller('posts')
export class PostController {
  constructor(private readonly PostService: PostService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: PostDTO) {
    return this.PostService.createPost(body);
  }

  @Get(':id')
  getId(@Param('id') id: number) {
    return this.PostService.getId(id);
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
}
