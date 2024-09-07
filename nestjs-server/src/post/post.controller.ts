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
  vote(@Body() body: any, @Param('id') id: number) {
    console.log(body, id);
    return this.PostService.vote(id, body.userId, body.voteType);
  }
}
