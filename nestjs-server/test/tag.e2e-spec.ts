import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp } from './utils/test.utils';
import { TagDbPrepareUtil } from './utils/tag-db-prepare.utils';

describe('Tag Module (e2e)', () => {
  let app: INestApplication;
  let requestAgent: any;
  let userId: number;
  let adminToken: string;
  let userToken: string;

  let TagDTO = {
    name: 'nestjs',
    description:
      'NestJS is a framework for building efficient, scalable Node.js server-side applications.',
  };

  beforeAll(async () => {
    const { app: testApp } = await createTestApp([TagDbPrepareUtil]);
    app = testApp;
    const userDbPrepareUtil = app.get(TagDbPrepareUtil);
    await userDbPrepareUtil.prepare();
    requestAgent = request(app.getHttpServer());

    const loginAdminResponse = await requestAgent
      .post('/auth/login')
      .send({ email: 'thachdinh@gmail.com', password: '123' });
    adminToken = loginAdminResponse.body.accessToken;

    const loginResponse = await requestAgent
      .post('/auth/login')
      .send({ email: 'dieuvy@gmail.com', password: '123' });
    userToken = loginResponse.body.accessToken;
  });

  describe('POST /tags', () => {
    // 1. Create tag without adminToken
    it('1. should return 401 when create tag without adminToken', async () => {
      const response = await requestAgent.post('/tags').send(TagDTO);
      expect(response.status).toBe(401);

      expect(response.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 2. Create tag with invalid adminToken
    it('2. should return 401 when create tag with invalid adminToken', async () => {
      const res = await requestAgent
        .post('/tags')
        .set('Authorization', 'Bearer invalid_token')
        .send(TagDTO)
        .expect(401);

      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 3. Create tag with user is not admin
    it('3. should return 403 when create tag with user is not admin', async () => {
      const res = await requestAgent
        .post('/tags')
        .set('Authorization', `Bearer ${userToken}`)
        .send(TagDTO)
        .expect(403);

      expect(res.body).toEqual({
        statusCode: 403,
        error: 'Forbidden',
        message: 'You do not have the required role',
      });
    });

    // 5. Create tag with name is empty
    it('4. should return 400 when create tag with name is empty', async () => {
      const res = await requestAgent
        .post('/tags')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...TagDTO, name: '' })
        .expect(400);
      expect(res.body).toEqual({
        statusCode: 400,
        message: ['name should not be empty'],
        error: 'Bad Request',
      });
    });

    // 4. Create tag with valid data

    it('5. should return 201 when create tag with valid data', async () => {
      const res = await requestAgent
        .post('/tags')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(TagDTO)
        .expect(201);
      expect(res.body).toEqual({
        success: true,
        statusCode: 200,
        error: null,
        data: {
          name: 'nestjs',
          description:
            'NestJS is a framework for building efficient, scalable Node.js server-side applications.',
          id: expect.any(String),
          view_number: 0,
          post_number: 0,
          question_number: 0,
          follower_number: 0,
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
      });
    });
  });

  describe('GET /tags/search', () => {
    // 1. Search tag without token
    it('1. should return 401 when search tag without token', async () => {
      const res = await requestAgent.get('/tags/search').expect(401);
      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 2. Search tag with invalid token
    it('2. should return 401 when search tag with invalid token', async () => {
      const res = await requestAgent
        .get('/tags/search')
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);

      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 3. Search tag with keyword is empty

    it('3. should return 400 when search tag with keyword is empty', async () => {
      const keyword = '';
      const res = await requestAgent
        .get(`/tags/search?keyword=${keyword}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(400);

      expect(res.body).toEqual({
        statusCode: 400,
        message: ['keyword should not be empty'],
        error: 'Bad Request',
      });
    });

    // 4. Search tag with valid keyword
    it('Should return 200 when search tag with valid keyword', async () => {
      const keyword = 'nest';
      const res = await requestAgent
        .get(`/tags/search?keyword=${keyword}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
      expect(res.body).toEqual({
        success: true,
        statusCode: 200,
        error: null,
        data: [
          {
            id: expect.any(String),
            name: 'nestjs',
            description:
              'NestJS is a framework for building efficient, scalable Node.js server-side applications.',
            view_number: 0,
            post_number: 0,
            question_number: 0,
            follower_number: 0,
            created_at: expect.any(String),
            updated_at: expect.any(String),
          },
        ],
      });
    });
  });

  describe('GET /tags/exist', () => {
    // 1. Check tag exist without token
    it('1. should return 401 when check tag exist without token', async () => {
      const name = 'nestjs';
      const res = await requestAgent
        .get(`/tags/exist?name=${name}`)
        .expect(401);
      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 2 Check tag exist with invalid token
    it('2. should return 401 when check tag exist with invalid token', async () => {
      const name = 'nestjs';
      const res = await requestAgent
        .get(`/tags/exist?name=${name}`)
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);

      expect(res.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    // 3. Check tag exist with name is empty
    it('3. should return 400 when check tag exist with name is empty', async () => {
      const name = '';
      const res = await requestAgent
        .get(`/tags/exist?name=${name}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(400);

      expect(res.body).toEqual({
        statusCode: 400,
        message: ['name should not be empty'],
        error: 'Bad Request',
      });
    });

    // 4. Check tag exist with valid name
    it('4. should return 200 when check tag exist with valid name', async () => {
      const name = 'nestjs';
      const res = await requestAgent
        .get(`/tags/exist?name=${name}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
      expect(res.body).toEqual({
        success: true,
        statusCode: 200,
        error: null,
        data: true,
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
