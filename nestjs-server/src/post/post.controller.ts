import { PostService } from './post.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostDTO } from './dto/post.dto';
@Controller('publish')
export class PostController {
  constructor(private readonly PostService: PostService) {}

  @Post('post')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: PostDTO) {
    return this.PostService.createPost(body);
  }
}
