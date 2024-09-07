import { CommentService } from './comment.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommentDTO } from './dto/comment.dto';
@Controller('comments')
export class CommentController {
  constructor(private readonly CommentService: CommentService) {}

  @Post()
  create(@Body() body: CommentDTO) {
    return this.CommentService.createComment(body);
  }

  @Get(':id')
  getCommentsByPostId(@Param('id') postId: number) {
    return this.CommentService.getCommentsByPostId(postId);
  }
}
