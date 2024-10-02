import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { CommentDTO, PostIdDTO } from './dto/comment.dto';
import {
  Comment,
  User,
  Post,
  Notification,
  NotificationDetail,
} from '../entity';
import { formatVietnameseDate } from '../utils/common.function';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentGateway } from './comment.gateway';
import { NotificationService } from '../../src/notification/notification.service';
import { commentType } from '../../src/enums';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,

    @InjectRepository(NotificationDetail)
    private notificationDetailRepository: Repository<NotificationDetail>,

    private readonly commentsGateway: CommentGateway,

    private notificationService: NotificationService,
  ) {}

  // create comment
  async create(body: CommentDTO, @Request() req: any) {
    const userId = req.user.userId;
    let replyForUser: User;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    /**Big detect */
    // const testUser = await this.userRepository.findOne({
    //   where: { id: undefined },
    // });

    // user là người comment
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const commentParent = await this.commentRepository.findOne({
      where: { id: body.parentId },
    });

    if (body.parentId && !commentParent) {
      throw new NotFoundException('Parent comment not found');
    }

    if (body.replyForUserId) {
      replyForUser = await this.userRepository.findOne({
        where: { id: body.replyForUserId },
      });

      if (!replyForUser) {
        throw new NotFoundException('Reply for user not found');
      }
    }

    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.author', 'author')
      .addSelect([
        'author.id',
        'author.fullName',
        'author.userName',
        'author.notificationToken',
      ])
      .where('post.id = :id', { id: body.postId })
      .getOne();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

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

    //create notification

    console.log('post.author.id : ', post.author.id);
    console.log('userId : ', userId);
    console.log('replyForUser?.id : ', replyForUser?.id);

    if (replyForUser && replyForUser.id !== userId) {
      console.log('come this case1!!');
      const notification = new Notification();
      notification.content = `đã nhắc đến bạn trong một bình luận`;
      notification.author = user;
      notification.commentId = comment.id;
      notification.post_slug = post.slug;

      await this.notificationRepository.save(notification);
      // send && create notification commenter
      const notificationDetail = new NotificationDetail();
      notificationDetail.notification = notification;
      notificationDetail.NotiForUser = replyForUser;

      await this.notificationDetailRepository.save(notificationDetail);

      await this.notificationService.sendNotificationToUser(
        replyForUser.notificationToken,
        post.id,
        user.fullName,
        commentType.REPLY,
      );
    }

    if (post.author.id !== userId && !replyForUser) {
      console.log('come this case2!!');
      const notification = new Notification();
      notification.content = `đã bình luận bài viết của bạn`;
      notification.author = user;
      notification.commentId = comment.id;
      notification.post_slug = post.slug;

      await this.notificationRepository.save(notification);
      // send && create notification to author
      const notiForAuthor = await this.userRepository.findOne({
        where: { id: post.author.id },
      });

      const notificationDetail = new NotificationDetail();
      notificationDetail.notification = notification;
      notificationDetail.NotiForUser = notiForAuthor;

      await this.notificationDetailRepository.save(notificationDetail);
      await this.notificationService.sendNotificationToUser(
        post.author.notificationToken,
        post.id,
        user.fullName,
        commentType.POST,
      );
    }

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: comment,
    };
  }

  // get comments by post id
  async getCommentsByPostId(params: PostIdDTO) {
    const post = await this.postRepository.findOne({
      where: { id: params.postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

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
