import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp } from './utils/test.utils';
import { CommentDbPrepareUtil } from './utils/comment-db-prepare.utils';
import { use } from 'passport';

describe('Comment Module (e2e)', () => {
  let app: INestApplication;
  let requestAgent: any;
  let user1Cookie: string;
  let user2Cookie: string;
  let userId1: number;
  let userId2: number;
  let postId: number;
  let commentBody: any;
  beforeAll(async () => {
    const { app: testApp } = await createTestApp([CommentDbPrepareUtil]);
    app = testApp;

    const commentDbPrepareUtil = app.get(CommentDbPrepareUtil);
    await commentDbPrepareUtil.prepare();

    requestAgent = request(app.getHttpServer());

    // User1 login
    const user1Res = await requestAgent
      .post('/auth/login')
      .send({ email: 'dieuvy@gmail.com', password: '123' });

    userId1 = user1Res.body.data.user.id;
    user1Cookie = user1Res.headers['set-cookie'];
    // User2 login
    const user2Res = await requestAgent
      .post('/auth/login')
      .send({ email: 'thachdinh@gmail.com', password: '123' });

    user2Cookie = user2Res.headers['set-cookie'];
    // user2Token = user2Res.body.accessToken;
    userId2 = user2Res.body.data.user.id;

    // Create Post
    const postRes = await requestAgent
      .post('/posts')
      .send({
        title: 'Post title',
        contentMarkdown: 'Post content',
        tagArray: ['nestjs'],
        status: 'PUBLISHED',
      })
      .set('Cookie', user1Cookie) // Gửi cookie hoàn chỉnh
      .expect(201);

    postId = postRes.body.data.id;
    commentBody = {
      content: 'Bai viet hay qua',
      postId: +postId,
      parentId: 0,
      replyForUserId: +userId1,
      replyForUserName: 'dieuvy',
    };
  });

  describe('POST /comments', () => {
    //1. Create comment without token
    it('1. should return 401 when create comment without token', async () => {
      const res = await requestAgent.post('/comments').send(commentBody);
      expect(res.body).toEqual({
        message: 'Unauthorized',
        statusCode: 401,
      });
    });

    //2. Create comment with invalid token
    it('2. Should return 401 when create comment with invalid token', async () => {
      const res = await requestAgent
        .post('/comments')
        .send(commentBody)
        .set('Cookie', 'Bearer invalid_token');
      expect(res.body).toEqual({
        message: 'Unauthorized',
        statusCode: 401,
      });
    });

    //3. Create comment successfully
    it('3. Should return 201 when create comment successfully', async () => {
      const res = await requestAgent
        .post('/comments')
        .send(commentBody)
        .set('Cookie', user2Cookie);

      expect(res.body).toEqual({
        success: true,
        statusCode: 200,
        error: null,
        data: {
          content: 'Bai viet hay qua',
          parentId: 0,
          replyForUserId: expect.any(Number),
          replyForUserName: 'dieuvy',
          id: expect.any(String),
          row_number: 0,
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
      });
    });

    //4. Create comment with invalid postId
    it('4. Should return 404 when create comment with invalid postId', async () => {
      const res = await requestAgent
        .post('/comments')
        .send({
          ...commentBody,
          postId: 99900000,
        })
        .set('Cookie', user2Cookie)
        .expect(404);

      expect(res.body).toEqual({
        message: 'Post not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });

    //5. Create comment with invalid replyForUserId
    it('5. Should return 404 when create comment with invalid replyForUserId', async () => {
      const res = await requestAgent
        .post('/comments')
        .send({
          ...commentBody,
          replyForUserId: 99900000,
        })
        .set('Cookie', user2Cookie)
        .expect(404);

      expect(res.body).toEqual({
        message: 'Reply for user not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });

    //6. Create comment with invalid parentId
    it('6. Should return 400 when create comment with invalid parentId', async () => {
      const invalidParentId = 'invalid';
      const res = await requestAgent
        .post('/comments')
        .send({
          ...commentBody,
          parentId: invalidParentId,
        })
        .set('Cookie', user2Cookie)
        .expect(400);

      expect(res.body).toEqual({
        message: [
          'parentId must be a number conforming to the specified constraints',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    //7. Create comment with parent comment not found
    it('7. Should return 404 when create comment with parent comment not found', async () => {
      const invalidParentId = 99900000;
      const res = await requestAgent
        .post('/comments')
        .send({
          ...commentBody,
          parentId: invalidParentId,
        })
        .set('Cookie', user2Cookie)
        .expect(404);

      expect(res.body).toEqual({
        message: 'Parent comment not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });

    //8. Create comment with content is empty
    it('8. Should return 400 when create comment with content is empty', async () => {
      const res = await requestAgent
        .post('/comments')
        .send({
          ...commentBody,
          content: '',
        })
        .set('Cookie', user2Cookie)
        .expect(400);

      expect(res.body).toEqual({
        message: ['content should not be empty'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });
  });

  describe('GET /comments/:postId', () => {
    //1. Get comments by post id
    it('1. Should return 200 when get comments by post id', async () => {
      const res = await requestAgent.get(`/comments/${postId}`).expect(200);
      expect(res.body).toEqual({
        success: true,
        statusCode: 200,
        error: null,
        data: expect.any(Array),
      });
    });

    //2. Get comments by post id with invalid postId
    it('2. Should return 404 when get comments by post id with invalid postId', async () => {
      const invalidPostId = 99900000;
      const res = await requestAgent
        .get(`/comments/${invalidPostId}`)
        .expect(404);
      expect(res.body).toEqual({
        message: 'Post not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });

    // 3. Get comments by post id with is less than 1
    it('3. Should return 400 when get comments by post id with is less than 1', async () => {
      const invalidPostId = 0;
      const res = await requestAgent
        .get(`/comments/${invalidPostId}`)
        .expect(400);

      expect(res.body).toEqual({
        message: ['postId must not be less than 1'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
