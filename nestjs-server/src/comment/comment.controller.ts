import { CommentService } from './comment.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentDTO } from './dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('comments')
export class CommentController {
  constructor(private readonly CommentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: CommentDTO) {
    return this.CommentService.create(body);
  }

  @Get(':id')
  getCommentsByPostId(@Param('id') postId: number) {
    return this.CommentService.getCommentsByPostId(postId);
  }
}
