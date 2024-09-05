import { Injectable } from '@nestjs/common';
import { CommentDTO } from './dto/comment.dto';
import { AppDataSource } from '../index';
import { Comment, User, Post } from '../entity';
@Injectable()
export class CommentService {
  async createComment(body: CommentDTO) {
    const commentRepository = AppDataSource.getRepository(Comment);

    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: +body.userId },
    });

    const post = await AppDataSource.getRepository(Post).findOne({
      where: { id: +body.postId },
    });

    const comment = new Comment();
    comment.content = body.content;
    comment.parentId = body.parentId;
    comment.parentName = body.parentName;
    comment.user = user;
    comment.post = post;
    // comment.row_number = parseInt(comment.row_number) + 1;
    console.log('type of : ', comment.row_number);
    await commentRepository.save(comment);

    delete comment?.post;
    delete comment?.user?.password;
    delete comment?.user?.email;

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: comment,
    };
  }

  // async getCommentsByPostId(postId: any) {
  //   const comments = await AppDataSource.getRepository(Comment).find({
  //     where: { post: { id: +postId } },
  //     relations: ['user'],
  //   });

  //   comments.forEach((comment) => {
  //     delete comment.post;
  //     delete comment?.user?.password;
  //     delete comment?.user?.email;
  //     delete comment?.user?.posts;
  //   });

  //   const formattedComments = comments.map((comment) => {
  //     return {
  //       ...comment,
  //       date: formatVietnameseDate(`${comment.created_at}`),
  //     };
  //   });

  //   return {
  //     success: true,
  //     statusCode: 200,
  //     error: null,
  //     data: formattedComments,
  //   };
  // }

  async getCommentsByPostId(postId: any) {
    const results = await AppDataSource.getRepository(Comment).query(`
      WITH replies AS (
        SELECT
            *,
            ROW_NUMBER() OVER (PARTITION BY c."parentId" ORDER BY created_at) AS rn
        FROM
            "comments" c
        WHERE
           c."parentId" IS NOT NULL
      )
      SELECT
          *
      FROM
          replies
      WHERE
          rn BETWEEN 1 AND 5;
    `);
    return results;
  }
}
