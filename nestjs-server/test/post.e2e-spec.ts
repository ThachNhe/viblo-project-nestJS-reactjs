import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Body } from '@nestjs/common';
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

  const postData = {
    title: 'Post title',
    contentMarkdown: 'Post content',
    tagArray: ['nestjs'],
    status: 'PUBLISHED',
  };

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
      const response = await requestAgent
        .post('/posts')
        .send({ ...postData })
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
    it('Should create a post unsuccessfully because Create post without token', async () => {
      const createPostDto = {
        ...postData,
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
        ...postData,
        title: '',
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
        ...postData,
        contentMarkdown: '',
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
        message: ['postId must be more than 1'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    //4. Get post unsuccessfully with id is string
    it('Should get a post unsuccessfully because id is string', async () => {
      const response = await requestAgent.get(`/posts/ohskgfjjf`).expect(400);
      expect(response.body).toEqual({
        message: [
          'postId must be more than 1',
          'postId must be an integer number',
          'postId must be a number conforming to the specified constraints',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
    });
  });

  describe('POST /posts/:id/bookmark', () => {
    //1. Bookmark post without token
    it('Should bookmark a post unsuccessfully because without token', async () => {
      const response = await requestAgent
        .post(`/posts/${postId}/bookmark`)
        .expect(401);
      expect(response.body).toEqual({
        message: 'Unauthorized',
        statusCode: 401,
      });
    });

    //2. Bookmark post successfully
    it('Should bookmark a post successfully', async () => {
      const response = await requestAgent
        .post(`/posts/${postId}/bookmark`)
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      expect(response.body).toEqual({
        success: true,
        statusCode: 200,
        error: null,
        data: 'Bookmark successfully',
      });
    });

    //3. Bookmark post unsuccessfully with wrong postId
    it('Should bookmark a post unsuccessfully because wrong postId', async () => {
      const invalidPostId = 8723987349;
      const response = await requestAgent
        .post(`/posts/${invalidPostId}/bookmark`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(response.body).toEqual({
        message: 'Post not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });

    //4. Bookmark post unsuccessfully with less than 1 id

    it('Should bookmark a post unsuccessfully because id is less than 1', async () => {
      const invalidPostId = -1;
      const response = await requestAgent
        .post(`/posts/${invalidPostId}/bookmark`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
      expect(response.body).toEqual({
        message: ['postId must be more than 1'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    //5 Bookmark post not found with id is string

    it('Should bookmark a post unsuccessfully because id is string', async () => {
      const response = await requestAgent
        .post(`/posts/ohskgfjjf/bookmark`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
      expect(response.body).toEqual({
        message: [
          'postId must be more than 1',
          'postId must be an integer number',
          'postId must be a number conforming to the specified constraints',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    //6. Unbookmark post successfully
    it('Should unbookmark a post successfully', async () => {
      const response = await requestAgent
        .delete(`/posts/${postId}/bookmark`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        statusCode: 200,
        error: null,
        data: 'UnBookmark successfully',
      });
    });

    // 7. unbookmark without token
    it('Should unbookmark a post uncucessfully because wihtout token', async () => {
      const response = await requestAgent
        .delete(`/posts/${postId}/bookmark`)
        .expect(401);
      expect(response.body).toEqual({
        message: 'Unauthorized',
        statusCode: 401,
      });
    });

    // 8. unbookmark unsuccessfully with wrong postId
    it('Should unbookmark a post unsuccessfully because wrong postId', async () => {
      const response = await requestAgent
        .delete(`/posts/8723987349/bookmark`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(response.body).toEqual({
        message: 'Post not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });
  });

  describe('GET /posts?page=&limit=', () => {
    //1. Get pagination posts successfully
    it('Should get pagination post successfully!', async () => {
      const response = await requestAgent
        .get('/posts?page=1&limit=10')
        .expect(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('statusCode', 200);
      expect(response.body).toHaveProperty('error', null);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('meta');
    });

    //2. get pagination posts unsuccessfully with page is string
    it('Should get pagination post unsuccessfully because page is string', async () => {
      const response = await requestAgent
        .get('/posts?page=abc&limit=10')
        .expect(400);

      expect(response.body).toEqual({
        message: [
          'page must not be less than 1',
          'page must be a number conforming to the specified constraints',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    //3. get pagination posts unsuccessfully with page is less than 1
    it('Should get pagination post unsuccessfully because page is less than 1', async () => {
      const response = await requestAgent
        .get('/posts?page=0&limit=10')
        .expect(400);

      expect(response.body).toEqual({
        message: ['page must not be less than 1'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    //4. get pagination posts unsuccessfully with limit is string
    it('Should get pagination post unsuccessfully because limit is string', async () => {
      const response = await requestAgent
        .get('/posts?page=1&limit=abc')
        .expect(400);

      expect(response.body).toEqual({
        message: [
          'limit must not be less than 1',
          'limit must be a number conforming to the specified constraints',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    //5. get pagination posts unsuccessfully with limit is less than 1
    it('Should get pagination post unsuccessfully because limit is less than 1', async () => {
      const response = await requestAgent
        .get('/posts?page=1&limit=0')
        .expect(400);

      expect(response.body).toEqual({
        message: ['limit must not be less than 1'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });
  });

  describe('POST /posts/:id/vote', () => {
    //1. Vote post without token
    it('Should vote a post unsuccessfully because without token', async () => {
      const response = await requestAgent
        .post(`/posts/${postId}/vote`)
        .send({ voteType: 'UPVOTE' })
        .expect(401);
      expect(response.body).toEqual({
        message: 'Unauthorized',
        statusCode: 401,
      });
    });

    //2.Vote post not VoteType
    it('Should vote a post unsuccessfully because voteType is not VoteType', async () => {
      const response = await requestAgent
        .post(`/posts/${postId}/vote`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(response.body).toEqual({
        message: [
          'voteType must be one of the following values: UPVOTE, DOWNVOTE',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    //3. Vote post not found
    it('Should vote a post unsuccessfully because wrong postId', async () => {
      const response = await requestAgent
        .post(`/posts/8723987349/vote`)
        .send({ voteType: 'UPVOTE' })
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(response.body).toEqual({
        message: 'Post not found',
        error: 'Not Found',
        statusCode: 404,
      });
    });

    //4. Vote post successfully with upvote one time
    it('Should vote a post successfully with upvote one time', async () => {
      const response = await requestAgent
        .post(`/posts/${postId}/vote`)
        .send({ voteType: 'UPVOTE' })
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('statusCode', 200);
      expect(response.body).toHaveProperty('error', null);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('vote_number', 1);
      expect(response.body.data).toHaveProperty('tags_array');
    });

    //5. Vote post successfully with upvote second time
    it('Should vote a post successfully with upvote second time', async () => {
      const response = await requestAgent
        .post(`/posts/${postId}/vote`)
        .send({ voteType: 'UPVOTE' })
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('statusCode', 200);
      expect(response.body).toHaveProperty('error', null);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('vote_number', 0);
      expect(response.body.data).toHaveProperty('tags_array');
    });
    //6. Vote post successfully with upvote repeat time
    it('Should vote a post successfully with upvote repeat time for next test case', async () => {
      const response = await requestAgent
        .post(`/posts/${postId}/vote`)
        .send({ voteType: 'UPVOTE' })
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('statusCode', 200);
      expect(response.body).toHaveProperty('error', null);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('vote_number', 1);
      expect(response.body.data).toHaveProperty('tags_array');
    });

    //7. Vote post successfully with downvote
    it('Should vote a post successfully with downvote', async () => {
      const response = await requestAgent
        .post(`/posts/${postId}/vote`)
        .send({ voteType: 'DOWNVOTE' })
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('statusCode', 200);
      expect(response.body).toHaveProperty('error', null);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('vote_number', -1);
      expect(response.body.data).toHaveProperty('tags_array');
    });

    //7. Vote post successfully with downvote to reset vote_number`
    it('Should vote a post successfully with downvote to reset vote_number', async () => {
      const response = await requestAgent
        .post(`/posts/${postId}/vote`)
        .send({ voteType: 'DOWNVOTE' })
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('statusCode', 200);
      expect(response.body).toHaveProperty('error', null);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('vote_number', 0);
      expect(response.body.data).toHaveProperty('tags_array');
    });

    //================================================================================================
    //9. Vote post successfully with downvote one time
    it('Should vote a post successfully with downvote one time', async () => {
      const response = await requestAgent
        .post(`/posts/${postId}/vote`)
        .send({ voteType: 'DOWNVOTE' })
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('statusCode', 200);
      expect(response.body).toHaveProperty('error', null);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('vote_number', -1);
      expect(response.body.data).toHaveProperty('tags_array');
    });

    //10. Vote post successfully with downvote second time
    it('Should vote a post successfully with downvote second time', async () => {
      const response = await requestAgent
        .post(`/posts/${postId}/vote`)
        .send({ voteType: 'DOWNVOTE' })
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('statusCode', 200);
      expect(response.body).toHaveProperty('error', null);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('vote_number', 0);
      expect(response.body.data).toHaveProperty('tags_array');
    });
    //11. Vote post successfully with downvote repeat time
    it('Should vote a post successfully with downvote one time', async () => {
      const response = await requestAgent
        .post(`/posts/${postId}/vote`)
        .send({ voteType: 'DOWNVOTE' })
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('statusCode', 200);
      expect(response.body).toHaveProperty('error', null);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('vote_number', -1);
      expect(response.body.data).toHaveProperty('tags_array');
    });

    //12. Vote post successfully with upvote
    it('Should vote a post successfully with upvote', async () => {
      const response = await requestAgent
        .post(`/posts/${postId}/vote`)
        .send({ voteType: 'UPVOTE' })
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('statusCode', 200);
      expect(response.body).toHaveProperty('error', null);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('vote_number', 1);
      expect(response.body.data).toHaveProperty('tags_array');
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
