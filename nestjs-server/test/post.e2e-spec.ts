import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { DatabaseClearUtil } from './database-clear.util';
import { PostDatabasePrepareUtil } from './utils/database-post-prepare.util';

describe('Post Module (e2e)', () => {
  let app: INestApplication;
  let requestAgent: any;
  let token: string;
  let postId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [DatabaseClearUtil, PostDatabasePrepareUtil],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const postDatabasePrepareUtil = moduleFixture.get<PostDatabasePrepareUtil>(
      PostDatabasePrepareUtil,
    );
    await postDatabasePrepareUtil.prepare();

    requestAgent = request(app.getHttpServer());
    const loginResponse = await requestAgent
      .post('/auth/login')
      .send({ email: 'thachdinh@gmail.com', password: '123' });
    token = loginResponse.body.accessToken;
  });

  describe('POST /posts', () => {
    //1. Create post successfully
    it('Should create a post successfully', async () => {
      const createPostDto = {
        title: 'Post title',
        contentMarkdown: 'Post content',
        tagArray: ['nestjs'],
        status: 'PUBLISHED',
      };

      const response = await requestAgent
        .post('/posts')
        .send(createPostDto)
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      postId = response.body.data.id;

      expect(response.body).toEqual({
        success: true,
        statusCode: 200,
        error: null,
        data: {
          title: 'Post title',
          content_markdown: 'Post content',
          tags_array: ['nestjs'],
          tags: [
            {
              id: expect.any(String),
              name: 'nestjs',
              description: 'Nestjs',
              view_number: 0,
              post_number: 0,
              question_number: 0,
              follower_number: 0,
              created_at: expect.any(String),
              updated_at: expect.any(String),
            },
          ],
          seriesId: null,
          id: expect.any(String),
          status: 'PUBLISH',
          view_number: 0,
          vote_number: 0,
          bookmark_number: 0,
          comment_number: 0,
          isPublished: false,
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
      });
    });

    //2. Create post without token
    it('Should create a post successfully', async () => {
      const createPostDto = {
        title: 'Post title',
        contentMarkdown: 'Post content',
        tagArray: [],
        status: 'PUBLISHED',
      };

      const response = await requestAgent
        .post('/posts')
        .send(createPostDto)
        .expect(401);

      expect(response.body).toEqual({
        message: 'Unauthorized',
        statusCode: 401,
      });
    });

    //3. Create post with title is empty
    it('Should create a post unsuccessfully because title is empty()', async () => {
      const createPostDto = {
        title: '',
        contentMarkdown: 'Post content',
        tagArray: ['nestjs'],
        status: 'PUBLISHED',
      };

      const response = await requestAgent
        .post('/posts')
        .send(createPostDto)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(response.body).toEqual({
        message: ['title should not be empty'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    //4. Create post with content is empty
    it('Should create a post successfully because content is empty()', async () => {
      const createPostDto = {
        title: 'abc',
        contentMarkdown: '',
        tagArray: ['nestjs'],
        status: 'PUBLISHED',
      };

      const response = await requestAgent
        .post('/posts')
        .send(createPostDto)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(response.body).toEqual({
        message: ['contentMarkdown should not be empty'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    //5. Create post with less than 1 tag
    it('Should create a post successfully because less than 1 tag', async () => {
      const createPostDto = {
        title: 'abc',
        contentMarkdown: 'sdfsf',
        tagArray: [],
        status: 'PUBLISHED',
      };

      const response = await requestAgent
        .post('/posts')
        .send(createPostDto)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(response.body).toEqual({
        message: ['tagArray must contain at least one tag.'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    //6. Create post with more than 5 tags
    it('Should create a post successfully because more than 5 tags', async () => {
      const createPostDto = {
        title: 'abc',
        contentMarkdown: 'sdfsf',
        tagArray: ['a', 'b', 'c', 'd', 'e', 'f'],
        status: 'PUBLISHED',
      };

      const response = await requestAgent
        .post('/posts')
        .send(createPostDto)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(response.body).toEqual({
        message: ['tagArray must contain at most five tags.'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });
  });

  describe('GET /posts/:id', () => {
    //1. Get post successfully
    it('Should get a post successfully', async () => {
      const response = await requestAgent.get(`/posts/${postId}`).expect(200);

      expect(response.body).toEqual({
        success: true,
        statusCode: 200,
        error: null,
        data: {
          id: expect.any(String),
          title: 'Post title',
          content_markdown: 'Post content',
          tags_array: ['nestjs'],
          status: 'PUBLISH',
          view_number: expect.any(Number),
          vote_number: 0,
          bookmark_number: 0,
          comment_number: 0,
          isPublished: false,
          seriesId: null,
          created_at: expect.any(String),
          updated_at: expect.any(String),
          userVotes: [],
          comments: [],
          author: {
            id: expect.any(String),
            fullName: 'Test User',
            userName: 'thachdinh',
            roles: 'ADMIN',
            avatar: null,
            follower_number: 0,
            star_number: 0,
            post_number: 1,
            isBlocked: false,
            created_at: expect.any(String),
            updated_at: expect.any(String),
          },
          bookmarkers: [],
          createdDate: expect.any(String),
        },
      });
    });

    //2. Get post unsuccessfully with wrong id
    it('Should get a post unsuccessfully because wrong id', async () => {
      const response = await requestAgent
        .get(`/posts/${98428234575834}`)
        .expect(404);

      expect(response.body).toEqual({
        message: 'Post not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });

    //3. Get post unsuccessfully with less than 1 id
    it('Should get a post unsuccessfully because id is less than 1', async () => {
      const response = await requestAgent.get(`/posts/-1`).expect(400);
      expect(response.body).toEqual({
        message: ['postId must be less than 1 id'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    //4. Get post unsuccessfully with id is string
    it('Should get a post unsuccessfully because id is string', async () => {
      const response = await requestAgent.get(`/posts/ohskgfjjf`).expect(400);
      expect(response.body).toEqual({
        message: [
          'postId must be less than 1 id',
          'postId must be an integer number',
          'postId must be a number conforming to the specified constraints',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
    });
  });

  describe('POST /posts/:id/vote', () => {
    //1. Vote post successfully
    it('Should vote a post successfully', async () => {
      console.log('postId', postId);
      // const vote = await requestAgents
      //   .post(`/posts/${postId}/vote`)
      //   .send({ voteType: 'UPVOTE' })
      //   .set('Authorization', `Bearer ${token}`)
      //   .expect(201);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
