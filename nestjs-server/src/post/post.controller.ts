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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostDTO } from './dto/post.dto';
@Controller('post')
export class PostController {
  constructor(private readonly PostService: PostService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: PostDTO) {
    return this.PostService.createPost(body);
  }

  @Get()
  getId(@Query() params: any) {
    return this.PostService.getId(params.id);
  }

  @Post('/upvote')
  @UseGuards(AuthGuard('jwt'))
  upvotePost(@Body() body: any) {
    return this.PostService.vote(body.postId, body.userId, body.voteType);
  }
}
