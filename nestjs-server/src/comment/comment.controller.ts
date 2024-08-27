import { CommentService } from './comment.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommentDTO } from './dto/comment.dto';
@Controller('comment')
export class CommentController {
  constructor(private readonly CommentService: CommentService) {}

  @Post()
  create(@Body() body: CommentDTO) {
    return this.CommentService.createComment(body);
  }

  @Get()
  getCommentsByPostId(@Query() params: any) {
    return this.CommentService.getCommentsByPostId(params.postId);
  }
}
