import { CommentService } from './comment.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CommentDTO } from './dto/comment.dto';
@Controller('comment')
export class CommentController {
  constructor(private readonly CommentService: CommentService) {}

  @Post()
  create(@Body() body: CommentDTO) {
    return this.CommentService.createComment(body);
  }
}
