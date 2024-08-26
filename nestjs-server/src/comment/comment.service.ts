import { Injectable } from '@nestjs/common';
import { CommentDTO } from './dto/comment.dto';
import { AppDataSource } from '../index';
import { Comment, User, Post } from '../entity';

@Injectable()
export class CommentService {
  async createComment(body: CommentDTO) {
    const commentRepository = AppDataSource.getRepository(Comment);

    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: body.userId },
    });

    const post = await AppDataSource.getRepository(Post).findOne({
      where: { id: body.postId },
    });

    const comment = new Comment();
    comment.content = body.content;
    comment.parentId = body.parentId;
    comment.parentName = body.parentName;
    comment.user = user;
    comment.post = post;

    await commentRepository.save(comment);

    delete comment.post;
    delete comment?.user?.password;
    delete comment?.user?.email;

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: comment,
    };
  }
}
