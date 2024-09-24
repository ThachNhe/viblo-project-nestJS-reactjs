import { Injectable, Request } from '@nestjs/common';
import { CommentDTO, PostIdDTO } from './dto/comment.dto';
import { AppDataSource } from '../index';
import { Comment, User, Post } from '../entity';
import { formatVietnameseDate } from '../utils/common.function';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentGateway } from './comment.gateway';
import { de } from 'date-fns/locale';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private readonly commentsGateway: CommentGateway,
  ) {}

  // create comment
  async create(body: CommentDTO, @Request() req: any) {
    const userId = req.user.id;
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: userId },
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

    await this.commentRepository.save(comment);

    delete comment?.post;
    delete comment?.user;

    this.commentsGateway.server.emit('newComment', {
      comment,
      postId: body.postId,
    });

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: comment,
    };
  }

  async getCommentsByPostId(params: PostIdDTO) {
    let results = await this.commentRepository.query(`
      WITH replies AS (
        SELECT
            *,
            ROW_NUMBER() OVER (PARTITION BY c."parentId" ORDER BY created_at) AS rn
        FROM
            "comments" c
        WHERE
           c."parentId" IS NOT NULL AND c."postId" = ${params.postId}
      )
      SELECT
          r."id", r."content", r."parentId", r."row_number", r."replyForUserId", r."replyForUserName",r."created_at",
          u."id" as "authorId", u."fullName" as authorfullname, u."userName" as authoruserName, u."avatar" as authorAvatar
      FROM
          replies r
      LEFT JOIN "users" u ON r."userId" = u."id"
    `);

    if (results?.length === 0 || !results) {
      return {
        success: true,
        statusCode: 200,
        error: null,
        data: [],
      };
    }

    results = results?.map((comment: any) => {
      return {
        ...comment,
        createdDate: formatVietnameseDate(comment.created_at),
      };
    });

    const groupedById = results?.reduce((acc: any, obj: any) => {
      // Nếu chưa có nhóm nào cho id này, tạo nhóm mới
      if (!acc[obj.parentId]) {
        acc[obj.parentId] = [];
      }
      // Thêm object vào nhóm tương ứng với id
      acc[obj.parentId].push(obj);
      return acc;
    }, {});

    const firstLevelComments = groupedById['0'];

    const finalComments = firstLevelComments?.map((comment: any) => {
      return { ...comment, replies: groupedById[comment.id] };
    });

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: finalComments,
    };
  }
}
