import { INestApplication, Body } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp } from './utils/test.utils';
import { StatisticDbPrepareUtil } from './utils/statistic-db-prepare.utils';

describe('Statistic Module (e2e)', () => {
  let app: INestApplication;
  let requestAgent: any;
  // let userId: number;
  let adminCookie: string;
  let userCookie: string;

  // let adminToken: string;
  // let userToken: string;

  beforeAll(async () => {
    const { app: testApp } = await createTestApp([StatisticDbPrepareUtil]);
    app = testApp;
    const statisticDbPrepareUtil = app.get(StatisticDbPrepareUtil);
    await statisticDbPrepareUtil.prepare();
    requestAgent = request(app.getHttpServer());

    const loginAdminResponse = await requestAgent
      .post('/auth/login')
      .send({ email: 'thachdinh@gmail.com', password: '123' });
    // adminToken = loginAdminResponse.body.accessToken;
    adminCookie = loginAdminResponse.headers['set-cookie'];

    const loginResponse = await requestAgent
      .post('/auth/login')
      .send({ email: 'dieuvy@gmail.com', password: '123' });

    userCookie = loginResponse.headers['set-cookie'];
  });

  describe('GET /statistics/tags', () => {
    // 1. Get statistic tag without token
    it('1. Should return 401 because of without token', async () => {
      const res = await requestAgent.get('/statistics/tags').expect(401);
      expect(res.body).toEqual({ statusCode: 401, message: 'Unauthorized' });
    });

    // 2 get statistic tags with invalid token
    it('2. Should return 401 because of invalid token', async () => {
      const invalidToken = 'invalid_token';
      const res = await requestAgent
        .get('/statistics/tags')
        .set('Cookie', `${invalidToken}`)
        .expect(401);

      expect(res.body).toEqual({ statusCode: 401, message: 'Unauthorized' });
    });

    // 3 get statistic tags with user is not admin
    it('3. Should return 403 because of user is not admin', async () => {
      const res = await requestAgent
        .get('/statistics/tags')
        .set('Cookie', userCookie)
        .expect(403);

      expect(res.body).toEqual({
        statusCode: 403,
        error: 'Forbidden',
        message: 'You do not have the required role',
      });
    });

    // 4 get statistic tags with valid token
    it('Should return statistic tags', async () => {
      const res = await requestAgent
        .get('/statistics/tags')
        .set('Cookie', adminCookie)
        .expect(200);

      expect(res.body).toEqual({
        success: true,
        statusCode: 200,
        error: null,
        data: {
          tagNumber: 6,
          postNumber: 1,
        },
      });
    });
  });

  describe('GET /statistics/common', () => {
    // 1. Get statistic common without token
    it('1. Should return 401 because of without token', async () => {
      const res = await requestAgent.get('/statistics/common').expect(401);
      expect(res.body).toEqual({ statusCode: 401, message: 'Unauthorized' });
    });

    // 2 get statistic common with invalid token
    it('2. Should return 401 because of invalid token', async () => {
      const res = await requestAgent
        .get('/statistics/common')
        .set('Cookie', 'invalid token')
        .expect(401);
      expect(res.body).toEqual({ statusCode: 401, message: 'Unauthorized' });
    });

    // 3 get statistic common with user is not admin
    it('3. Should return 403 because of user is not admin', async () => {
      const res = await requestAgent
        .get('/statistics/common')
        .set('Cookie', userCookie)
        .expect(403);

      expect(res.body).toEqual({
        statusCode: 403,
        error: 'Forbidden',
        message: 'You do not have the required role',
      });
    });

    // 4 get statistic common with valid token
    it('4. Should return statistic common', async () => {
      const res = await requestAgent
        .get('/statistics/common')
        .set('Cookie', adminCookie)
        .expect(200);

      expect(res.body).toEqual({
        success: true,
        statusCode: 200,
        error: null,
        data: {
          tagNumber: 6,
          postNumber: 1,
          userNumber: 2,
          commentNumber: 0,
          viewNumber: 0,
        },
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
