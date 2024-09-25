import { CommentService } from './comment.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentDTO, PostIdDTO } from './dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  CommentApiResponseDTO,
  CommentListApiResponseDTO,
} from './dto/comment-response.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly CommentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CommentApiResponseDTO })
  create(@Body() body: CommentDTO, @Request() req: any) {
    return this.CommentService.create(body, req);
  }

  @Get(':postId')
  @ApiOkResponse({ type: CommentListApiResponseDTO })
  getCommentsByPostId(@Param() params: PostIdDTO) {
    return this.CommentService.getCommentsByPostId(params);
  }
}
