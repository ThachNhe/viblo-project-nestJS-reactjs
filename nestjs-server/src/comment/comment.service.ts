import { Injectable } from '@nestjs/common';
import { CommentDTO } from './dto/comment.dto';
import { AppDataSource } from '../index';
import { Comment, User, Post } from '../entity';
import { formatVietnameseDate } from '../utils/common.function';
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
    comment.replyForUserId = body.replyForUserId;
    comment.replyForUserName = body.replyForUserName;

    comment.user = user;
    comment.post = post;
    // comment.row_number = parseInt(comment.row_number) + 1;
    // console.log('type of : ', comment.row_number);
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

  async getCommentsByPostId(postId: any) {
    let results = await AppDataSource.getRepository(Comment).query(`
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
          r."id", r."content", r."parentId", r."row_number", r."replyForUserId", r."replyForUserName",r."created_at",
          u."id" as "authorId", u."fullName" as authorUserName, u."userName" as authorFullName
      FROM
          replies r
      LEFT JOIN "users" u ON r."userId" = u."id"
      WHERE
          rn BETWEEN 1 AND 5;
    `);

    results = results.map((comment: any) => {
      return {
        ...comment,
        createdDate: formatVietnameseDate(comment.created_at),
      };
    });
    const data = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 1, name: 'Item 3' },
      { id: 3, name: 'Item 4' },
      { id: 2, name: 'Item 5' },
      { id: 1, name: 'Item 6' },
    ];

    const groupedById = results.reduce((acc: any, obj: any) => {
      // Nếu chưa có nhóm nào cho id này, tạo nhóm mới
      if (!acc[obj.parentId]) {
        acc[obj.parentId] = [];
      }
      // Thêm object vào nhóm tương ứng với id
      acc[obj.parentId].push(obj);
      return acc;
    }, {});

    // console.log(groupedById);
    const firstLevelComments = groupedById['0'];

    const finalComments = firstLevelComments.map((comment: any) => {
      return { ...comment, replies: groupedById[comment.id] };
    });

    return finalComments;
  }
}
